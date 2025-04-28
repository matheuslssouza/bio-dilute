package com.biodilute.biodilute.user.repository;

import com.biodilute.biodilute.user.entity.Account;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository extends CrudRepository<Account, UUID> {
    public Optional<Account> findByUsername(String username);
}
