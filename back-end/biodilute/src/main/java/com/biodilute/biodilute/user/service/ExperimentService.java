package com.biodilute.biodilute.user.service;

import com.biodilute.biodilute.user.entity.Experiment;
import com.biodilute.biodilute.user.repository.ExperimentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ExperimentService {

    ExperimentRepository experimentRepository;

    ExperimentService(ExperimentRepository experimentRepository) {
        this.experimentRepository = experimentRepository;
    }

    public Iterable<Experiment> findAll() {
        return experimentRepository.findAll();
    }

    public List<Experiment> findExperimentsById(UUID userId) {

       List<Experiment> experiments = experimentRepository.findByUserId(userId);
       if(experiments.isEmpty()) {
           throw new RuntimeException("Experiment not found");
       }

      return experiments.stream().sorted(Comparator.comparing(Experiment::getDate)).collect(Collectors.toList());
    }

    public void saveExperiment (Experiment experiment) {
        experimentRepository.save(experiment);
    }

    public boolean deleteExperiment(UUID experimentId, UUID userId) {
        Optional <Experiment> experimentOpt = experimentRepository.findById(experimentId);
        experimentOpt.orElseThrow(() -> new EntityNotFoundException("Experiment not found"));

        if (!experimentOpt.get().getUserId().equals(userId)) {
            return false;
        }
        experimentRepository.deleteById(experimentId);
        return true;
    }

    public boolean updateExperiment(UUID userId, Experiment experiment) {
        return experimentRepository.findById(experiment.getId())
                .map(existingExperiment -> {
                    if (!existingExperiment.getUserId().equals(userId)) {
                        return false;
                    }

                    existingExperiment.setExperimentName(experiment.getExperimentName());
                    existingExperiment.setIngredient(experiment.getIngredient());
                    existingExperiment.setDate(experiment.getDate());
                    existingExperiment.setWeight(experiment.getWeight());
                    existingExperiment.setVolume(experiment.getVolume());
                    existingExperiment.setSolvent(experiment.getSolvent());
                    existingExperiment.setMethodDilution(experiment.getMethodDilution());
                    existingExperiment.setObservations(experiment.getObservations());

                    experimentRepository.save(existingExperiment);
                    return true;
                })
                .orElseThrow(() -> new EntityNotFoundException("Experiment not found"));
    }

}
