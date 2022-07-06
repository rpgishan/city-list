package com.gish.citylist.citylistcoreapi.dto;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

public class JwtRequest {

    @NotNull(message = "Username can not be blank")
    @Length(min = 1, max = 20, message = "Length of the Username should be between 1 to 20")
    private String username;
    @NotNull(message = "Password can not be blank")
    @Length(min = 8, max = 20, message = "Length of the Password should be between 8 to 20")
    private String password;

    //need default constructor for JSON Parsing
    public JwtRequest() {

    }

    public JwtRequest(final String username, final String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }
}
