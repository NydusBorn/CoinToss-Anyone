package casinolie.lieserver.UserManagement;

import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    public Boolean register(String username, String perceivedName, String passwordHash) {
        //TODO: Implement
        return false;
    }
    
    @GetMapping("/user/exists")
    public Boolean exists(@RequestParam String username) {
        return Objects.equals(username, "john doe");
    }
}
