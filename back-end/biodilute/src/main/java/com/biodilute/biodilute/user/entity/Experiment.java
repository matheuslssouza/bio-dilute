package com.biodilute.biodilute.user.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name="experiment")
public class Experiment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    private String experimentName;
    private String ingredient;
    private String date;
    private float weight;
    private float volume;
    private String solvent;
    private String methodDilution;
    private String observations;
    private UUID userId;


    public Experiment(String experimentName, String ingredient, String date, float weight, float volume, String solvent, String methodDilution, String observations) {
        this.experimentName = experimentName;
        this.ingredient = ingredient;
        this.date = date;
        this.weight = weight;
        this.volume = volume;
        this.solvent = solvent;
        this.methodDilution = methodDilution;
        this.observations = observations;
    }

    public Experiment() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getExperimentName() {
        return experimentName;
    }

    public void setExperimentName(String experimentName) {
        this.experimentName = experimentName;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getVolume() {
        return volume;
    }

    public void setVolume(float volume) {
        this.volume = volume;
    }

    public String getSolvent() {
        return solvent;
    }

    public void setSolvent(String solvent) {
        this.solvent = solvent;
    }

    public String getMethodDilution() {
        return methodDilution;
    }

    public void setMethodDilution(String methodDilution) {
        this.methodDilution = methodDilution;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
