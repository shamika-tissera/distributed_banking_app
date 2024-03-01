package mit.project.account_management.controller;

import mit.project.account_management.model.Account;
import mit.project.account_management.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<Account> get(@PathVariable Integer accountNumber){
        try{
            Account account = accountService.getAccount (accountNumber);
            return new ResponseEntity<Account> (account, HttpStatus.OK);
        } catch (NoSuchElementException e){
            return new ResponseEntity<Account> (HttpStatus.NOT_FOUND);
        }
    }
}
