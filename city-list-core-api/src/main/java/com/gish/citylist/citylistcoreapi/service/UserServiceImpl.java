package com.gish.citylist.citylistcoreapi.service;

import com.gish.citylist.citylistcoreapi.exceptions.UserNotFoundException;
import com.gish.citylist.citylistcoreapi.model.User;
import com.gish.citylist.citylistcoreapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    UserRepository repository;

    @Autowired
    public UserServiceImpl(final UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public User findById(final String username) {
        return repository.findById(username).orElseThrow(() -> new UserNotFoundException(username));
    }

    @Override
    public User save(final User user) {
        return repository.save(user);
    }

    @Override
    public User updateUser(final User newUser, final String username) {
        return repository.findById(username)
                .map(user -> {
                    user.setUsername(username);
                    user.setPassword(newUser.getPassword());
                    return repository.save(user);
                })
                .orElseGet(() -> repository.save(newUser));
    }
}
