package com.biodilute.biodilute.user.controller;

import com.biodilute.biodilute.user.dto.RowIdExperiment;
import com.biodilute.biodilute.user.entity.Experiment;
import com.biodilute.biodilute.user.entity.Account;
import com.biodilute.biodilute.user.service.ExperimentService;
import com.biodilute.biodilute.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class AccountController {

   private final UserService userService;

    AccountController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody Account account) {
        userService.saveUser(account);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }




}
