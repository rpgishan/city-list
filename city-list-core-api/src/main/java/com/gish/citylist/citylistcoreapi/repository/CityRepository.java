package com.gish.citylist.citylistcoreapi.repository;

import com.gish.citylist.citylistcoreapi.model.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findByName(String name);

//    Page<City> findByName(String name, Pageable pageable);
}
