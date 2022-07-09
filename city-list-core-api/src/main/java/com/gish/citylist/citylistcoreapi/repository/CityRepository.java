package com.gish.citylist.citylistcoreapi.repository;

import com.gish.citylist.citylistcoreapi.model.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {

    @Query("SELECT c FROM City c WHERE c.name LIKE :name%")
    List<City> findByName(@Param("name") String name);

    @Query("SELECT c FROM City c WHERE c.name LIKE :name%")
    Page<City> findByNamePage(@Param("name") String name, Pageable pageable);

}
