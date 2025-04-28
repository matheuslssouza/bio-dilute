package com.biodilute.biodilute.user.service;

import com.biodilute.biodilute.user.entity.Account;
import com.biodilute.biodilute.user.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void saveUser(Account user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        accountRepository.save(user);
    }

    public Optional<Account> findUserByUsername(String username){
        return accountRepository.findByUsername(username);
    }

}
