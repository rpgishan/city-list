package com.gish.citylist.citylistcoreapi.repository;

import com.gish.citylist.citylistcoreapi.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
