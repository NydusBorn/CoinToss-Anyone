import os
import json
import sys

import select
import subprocess
import time
import psutil

is_public = False
used_port = 37923
port_lower_bound = 2 ** 14
port_upper_bound = 2 ** 16 - 1024

if not os.path.exists("lie_casino_launch_config.json"):
    print("Do you want to make this instance public? (y/N)")
    print("ie: instance would be accessible to the internet.")
    correct_answer = False
    while not correct_answer:
        answer = input()
        if answer == "y" or answer == "Y":
            is_public = True
            correct_answer = True
        elif answer == "n" or answer == "N" or answer == "":
            is_public = False
            correct_answer = True
        else:
            print("Please enter 'y' or 'n'")
    correct_answer = False
    print(f"Which port would you like to use? ({port_lower_bound}-{port_upper_bound})")
    print("It will use a pair of ports, one for frontend and one for backend.")
    print("ie: 37923 for frontend and 37924 for backend.")
    print(f"default is {used_port}.")
    while not correct_answer:
        answer = input()
        if answer == "":
            correct_answer = True
        else:
            try:
                converted = int(answer)
                if port_lower_bound <= converted <= port_upper_bound:
                    used_port = converted
                    correct_answer = True
                else:
                    raise ValueError 
            except ValueError:
                print(f"Please enter a number between {port_lower_bound} and {port_upper_bound} or leave blank for default.")
    open("lie_casino_launch_config.json", "w").write(json.dumps({
        "public": is_public,
        "port": used_port
    }))

conf = json.load(open("lie_casino_launch_config.json"))

config_correct = True

if "public" in conf:
    if type(conf["public"]) != bool:
        print("Config is incorrect: key 'public' has invalid type")
        config_correct = False
    elif conf["public"] != True and conf["public"] != False:
        print("Config is incorrect: key 'public' has invalid value")
        config_correct = False
    else:
        is_public = conf["public"]
else:
    print("Config is incorrect: key 'public' not found")
    config_correct = False
if "port" in conf:
    if type(conf["port"]) != int:
        print("Config is incorrect: key 'port' has invalid type")
        config_correct = False
    elif conf["port"] < port_lower_bound or conf["port"] > port_upper_bound:
        print("Config is incorrect: key 'port' has invalid value")
        config_correct = False
    else:
        used_port = conf["port"]
else:
    print("Config is incorrect: key 'port' not found")
    config_correct = False
if not config_correct:
    print("Do you want to remove config file? (y/N)")
    print("This is required in order to use question based setup.")
    correct_answer = False
    while (not correct_answer):
        answer = input()
        if answer == "y" or answer == "Y":
            config_correct = False
            correct_answer = True
        elif answer == "n" or answer == "N" or answer == "":
            correct_answer = True
        else:
            print("Please enter 'y' or 'n'")
else:
    def get_current_processes():
        current_processes = {}
        for proc in psutil.process_iter(['pid', 'name']):
            current_processes[proc.pid] = proc.name()
        return current_processes
    def kill_new_with_name(name_req, old_processes, new_processes):
        # Find and kill new processes that contain the substring
        for pid, name in new_processes.items():
            if pid not in old_processes and name_req == name:
                process = psutil.Process(pid)
                process.kill()
    #TODO: launch backend first 
    frontend_launch = ["npx", "vite"]
    if is_public:
        frontend_launch.append("--host")
    frontend_launch.append("--port")
    frontend_launch.append(str(used_port))
    processes_before_launch = get_current_processes()
    frontend = subprocess.Popen(frontend_launch, cwd="./lie-client", shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    time.sleep(1)
    if sys.platform == "win32":
        lines_to_read = 4
        if is_public:
            lines_to_read += 2
        for i in range(lines_to_read):
            line = frontend.stdout.readline().decode()[:-1]
            if "Local" in line or "Network" in line:
                print(line)
    else:
        poll_out = select.poll()
        poll_out.register(frontend.stdout.fileno(), select.POLLIN)
        while poll_out.poll(1):
            line = frontend.stdout.readline().decode()[:-1]
            if "Local" in line or "Network" in line:
                print(line)
    print("If you want to close the server: input 'quit'")
    while True:
        answer = input()
        if answer == "quit":
            time.sleep(1)
            #TODO: look into linux version, better if can assign custom name
            processes_after_launch = get_current_processes()
            kill_new_with_name("node.exe", processes_before_launch, processes_after_launch)
            break
        else:
            print("Available commands: 'quit'")