package mit.project.account_management.service;

import mit.project.account_management.model.Account;
import mit.project.account_management.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public void saveAccount(Account account){
        accountRepository.save (account);
    }

    public Account getAccount(Integer accountNumber){
        return accountRepository.findById (accountNumber).get ();
    }

    public void deleteAccount(Integer accountNumber){
        accountRepository.deleteById (accountNumber);
    }
}
