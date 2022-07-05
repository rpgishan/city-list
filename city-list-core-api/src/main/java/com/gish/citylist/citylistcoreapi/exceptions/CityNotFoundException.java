package com.gish.citylist.citylistcoreapi.exceptions;

public class CityNotFoundException extends RuntimeException {
    public CityNotFoundException(Long id) {
        super("Could not find city " + id);
    }
}
