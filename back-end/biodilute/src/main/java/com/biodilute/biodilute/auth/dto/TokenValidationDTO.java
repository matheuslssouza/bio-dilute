package com.biodilute.biodilute.auth.dto;

public class TokenValidationDTO {

    private boolean isAuthenticate;

    public TokenValidationDTO() {

    }

    public TokenValidationDTO(boolean isAuthenticate) {
        this.isAuthenticate = isAuthenticate;
    }

    public boolean isAuthenticate() {
        return isAuthenticate;
    }

}
