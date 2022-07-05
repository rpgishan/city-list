package com.gish.citylist.citylistcoreapi.service;

import com.gish.citylist.citylistcoreapi.model.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findById(String username);

    User save(User user);

    User updateUser(User user, String username);
}
