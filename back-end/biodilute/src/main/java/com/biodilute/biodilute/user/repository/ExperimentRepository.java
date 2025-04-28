package com.biodilute.biodilute.user.repository;

import org.springframework.data.repository.CrudRepository;
import com.biodilute.biodilute.user.entity.Experiment;

import java.util.List;
import java.util.UUID;

public interface ExperimentRepository extends CrudRepository<Experiment, UUID> {
    List<Experiment> findByUserId(UUID userId);
}
