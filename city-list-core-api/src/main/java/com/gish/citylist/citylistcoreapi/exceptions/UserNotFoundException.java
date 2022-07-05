package com.gish.citylist.citylistcoreapi.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(final String username) {
        super("Could not find user " + username);
    }
}
