package casinolie.lieserver.UserManagement;

import jakarta.annotation.Nullable;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    
    public static String getPasswordHash(String password){
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
        byte[] hashBytes = md.digest(password.getBytes());

        StringBuilder sb = new StringBuilder();
        for (byte b : hashBytes) {
            sb.append(String.format("%02x", b));
        }

        String hash = sb.toString();
        return hash;
    }
    @PostMapping("/user/register")
    public Boolean register(@RequestBody Map<String,String> requestData) {
        String username = requestData.get("username");
        String password = requestData.get("password");
        if (username == null || password == null) return false;
        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setPerceivedName(username);
        String hash = getPasswordHash(password);
        if (hash == null) {
            return false; 
        }
        newUser.setPasswordHash(hash);
        newUser.setCash(100L);
        newUser.setCoinTossLuck(0.5);
        userRepository.save(newUser);
        return true;
    }
    
    @GetMapping("/user/exists")
    public Boolean exists(@RequestParam String username) {
        if (username == null) return false;
        for (var user:userRepository.findAll()) {
            if (username.equals(user.getUsername())) {
                return true;
            }
        }
        return false;
    }
    
    @GetMapping("/user/credentialsCorrect")
    public Boolean credentialsCorrect(@RequestParam String username, @RequestParam String password) {
        if (username == null || password == null) return false;
        String hash = getPasswordHash(password);
        for (var user:userRepository.findAll()) {
            if (username.equals(user.getUsername())) {
                assert hash != null;
                if (hash.equals(user.getPasswordHash())) {
                    return true;
                }
            }
        }
        return false;
    }
    
    @GetMapping("/user/cash")
    public Optional<Long> getCash(@RequestParam String username, @RequestParam String password) {
        if (username == null || password == null) return Optional.empty();
        for (var user:userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPasswordHash(), getPasswordHash(password))) {
                return Optional.of(user.getCash());
            }
        }
        return Optional.empty();
    }
    
    @PostMapping("/user/resetCash")
    public Boolean resetCash(@RequestBody Map<String,String> requestData) {
        String username = requestData.get("username");
        String password = requestData.get("password");
        if (username == null || password == null) return false;
        String hash = getPasswordHash(password);
        for (var user:userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPasswordHash(), hash)) {
                user.setCash(100L);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
    
    @GetMapping("/user/getName")
    public Optional<String> getName(@RequestParam String username, @RequestParam String password) {
        if (username == null || password == null) return Optional.empty();
        for (var user:userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPasswordHash(), getPasswordHash(password))) {
                return Optional.of(user.getPerceivedName());
            }
        }
        return Optional.empty();
    }
    
    @PostMapping("/user/setName")
    public Boolean setName(@RequestBody Map<String,String> requestData) {
        String username = requestData.get("username");
        String password = requestData.get("password");
        if (username == null || password == null || requestData.get("name") == null) return false;
        String hash = getPasswordHash(password);
        for (var user:userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPasswordHash(), hash)) {
                user.setPerceivedName(requestData.get("name"));
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
    
    @GetMapping("/user/getCoinLuck")
    public Optional<Double> getCoinLuck(@RequestParam String username, @RequestParam String password) {
        if (username == null || password == null) return Optional.empty();
        for (var user:userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPasswordHash(), getPasswordHash(password))) {
                return Optional.of(user.getCoinTossLuck());
            }
        }
        return Optional.empty();
    }
    
    @PostMapping("/user/setCoinLuck")
    public Boolean setCoinLuck(@RequestBody Map<String,String> requestData) {
        String username = requestData.get("username");
        String password = requestData.get("password");
        if (username == null || password == null || requestData.get("luck") == null) return false;
        String hash = getPasswordHash(password);
        for (var user:userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPasswordHash(), hash)) {
                user.setCoinTossLuck(Double.parseDouble(requestData.get("luck")));
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}
