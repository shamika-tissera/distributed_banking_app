package mit.project.account_management.repository;

import mit.project.account_management.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository <Account, Integer> {


}
