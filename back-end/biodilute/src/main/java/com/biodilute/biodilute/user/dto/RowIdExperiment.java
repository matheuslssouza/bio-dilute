package com.biodilute.biodilute.user.dto;


import java.util.UUID;

public class RowIdExperiment {
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public RowIdExperiment(UUID id) {
        this.id = id;
    }

    public RowIdExperiment() {}
}
