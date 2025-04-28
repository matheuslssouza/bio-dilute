package com.biodilute.biodilute.user.controller;

import com.biodilute.biodilute.user.dto.RowIdExperiment;
import com.biodilute.biodilute.user.entity.Account;
import com.biodilute.biodilute.user.entity.Experiment;
import com.biodilute.biodilute.user.service.ExperimentService;
import com.biodilute.biodilute.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


    @RestController
    @RequestMapping("/")
    public class ExperimentController{

        private final ExperimentService experimentService;

       ExperimentController(ExperimentService experimentService) {
            this.experimentService = experimentService;
        }

        @GetMapping("experiments")
        public ResponseEntity<Iterable<Experiment>> getAllExperiments() {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Account user = (Account) auth.getPrincipal();

            return ResponseEntity.ok().body(experimentService.findExperimentsById(user.getId()));
        }

        @PostMapping("experiments")
        public ResponseEntity<Void> addExperiment(@RequestBody Experiment experiment) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Account user = (Account) auth.getPrincipal();
            experiment.setUserId(user.getId());
            experimentService.saveExperiment(experiment);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        }

        @PostMapping("experiments/update")
        public ResponseEntity<Void> updateExperiment(@RequestBody Experiment experiment) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Account user = (Account) auth.getPrincipal();
            if(experimentService.updateExperiment(user.getId(), experiment)){
                return ResponseEntity.status(HttpStatus.ACCEPTED).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }

        @PostMapping("experiments/delete")
        public ResponseEntity<Void> deleteExperiment(@RequestBody RowIdExperiment experiment ) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Account user = (Account) auth.getPrincipal();
            if(experimentService.deleteExperiment(experiment.getId(), user.getId())){
                return ResponseEntity.status(HttpStatus.ACCEPTED).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }



    }

