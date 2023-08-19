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

@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    
    private String getPasswordHash(String password){
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
        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        String hash = getPasswordHash(password);
        if (hash == null) {
            return false; 
        }
        newUser.setPasswordHash(hash);
        userRepository.save(newUser);
        return true;
    }
    
    @GetMapping("/user/exists")
    public Boolean exists(@RequestParam String username) {
        for (var user:userRepository.findAll()) {
            if (username.equals(user.getUsername())) {
                return true;
            }
        }
        return false;
    }
    
    @GetMapping("/user/credentialsCorrect")
    public Boolean credentialsCorrect(@RequestParam String username, @RequestParam String password) {
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
}
