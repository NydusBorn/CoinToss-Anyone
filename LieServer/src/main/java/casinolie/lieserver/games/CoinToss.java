package casinolie.lieserver.games;

import casinolie.lieserver.UserManagement.UserController;
import casinolie.lieserver.UserManagement.UserEntity;
import casinolie.lieserver.UserManagement.UserRepository;
import jakarta.annotation.Nullable;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

@RestController
public class CoinToss {
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/coinToss")
    public Optional<Long> coinToss(@RequestBody Map<String,String> requestData) {
        String username = requestData.get("username");
        String password = requestData.get("password");
        if (username == null || password == null) return Optional.empty();
        UserEntity usr = null;
        for (var user:userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPasswordHash(), UserController.getPasswordHash(password))) {
                usr = user;
            }
        }
        if (usr == null) return Optional.empty();
        Boolean betHeads = Boolean.parseBoolean(requestData.get("betHeads"));
        Long betAmount = Long.parseLong(requestData.get("betAmount"));
        if (requestData.get("betHeads") == null || requestData.get("betAmount") == null) return Optional.empty();
        Double luck = usr.getCoinTossLuck();
        Random rand = new Random();
        Double poll = rand.nextDouble();
        Boolean gotHeads = poll <= luck;
        Long result = 0L;
        if (betHeads) {
            if (gotHeads) {
                result = betAmount;
                usr.setCash(usr.getCash() + betAmount);
            }
            else {
                result = -betAmount;
                usr.setCash(usr.getCash() - betAmount);
            }
        }
        else {
            if (gotHeads) {
                result = -betAmount;
                usr.setCash(usr.getCash() - betAmount);
            }
            else {
                result = betAmount;
                usr.setCash(usr.getCash() + betAmount);
            }
        }
        userRepository.save(usr);
        return Optional.of(result);
    }
    
}
