package com.biodilute.biodilute.auth.dto;

public class LoginRequestDTO {

    private Long id;
    private String username;
    private String password;

    public LoginRequestDTO() {
    }

    public LoginRequestDTO(Long id, String username) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword (String password) {
        this.password = password;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


}

