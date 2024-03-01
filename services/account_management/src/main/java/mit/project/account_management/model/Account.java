package mit.project.account_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Account {
    @Id
    private Integer accountNumber;
    private String userName;
    private AccountType accountType;
    private int balance;

    public Account(Integer accountNumber, int balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getAccountNumber() {
        return accountNumber;
    }
}

enum AccountType{
    SAVINGS,
    CURRENT
}


