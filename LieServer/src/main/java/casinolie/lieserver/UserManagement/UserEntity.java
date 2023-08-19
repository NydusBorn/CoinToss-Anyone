package casinolie.lieserver.UserManagement;

import jakarta.persistence.*;
import org.h2.constraint.Constraint;
import org.h2.value.Value;
import jakarta.validation.constraints.*;
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    @Column(unique = true)
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    private String perceivedName;

    public String getPerceivedName() {
        return perceivedName;
    }

    public void setPerceivedName(String perceivedName) {
        this.perceivedName = perceivedName;
    }

    private String passwordHash;

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private Double coinTossLuck = 0.5;

    public Double getCoinTossLuck() {
        return coinTossLuck;
    }

    public void setCoinTossLuck(Double coinTossLuck) {
        this.coinTossLuck = coinTossLuck;
    }
    
    @DecimalMin("0.0")
    @DecimalMax("1.0")
    private Double slotsLuck = 0.5;

    public Double getSlotsLuck() {
        return slotsLuck;
    }

    public void setSlotsLuck(Double slotsLuck) {
        this.slotsLuck = slotsLuck;
    }
    
    private Long cash = 100L;

    public Long getCash() {
        return cash;
    }

    public void setCash(Long cash) {
        this.cash = cash;
    }
}
