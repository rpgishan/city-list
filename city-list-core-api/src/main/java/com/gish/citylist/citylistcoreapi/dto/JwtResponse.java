package com.gish.citylist.citylistcoreapi.dto;

public class JwtResponse {

    private final String jwttoken;

    public JwtResponse(final String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }
}