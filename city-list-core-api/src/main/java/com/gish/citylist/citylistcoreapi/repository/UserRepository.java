package com.gish.citylist.citylistcoreapi.repository;

import com.gish.citylist.citylistcoreapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
