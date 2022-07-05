package com.gish.citylist.citylistcoreapi.controller;

import com.gish.citylist.citylistcoreapi.exceptions.CityNotFoundException;
import com.gish.citylist.citylistcoreapi.model.City;
import com.gish.citylist.citylistcoreapi.repository.CityRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class CityController {
    private final CityRepository repository;

    public CityController(CityRepository repository) {
        this.repository = repository;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/city")
    public Iterable<City> all() {
        return repository.findAll();
    }
    // end::get-aggregate-root[]

    @PostMapping("/city")
    public City newCity(@RequestBody City newCity) { //TODO create CityDTO
        return repository.save(newCity);
    }

    // Single item

    @GetMapping("/city/{id}")
    public City one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(id));
    }

    @PutMapping("/employees/{id}")
    public City replaceCity(@RequestBody City newCity, @PathVariable Long id) {

        return repository.findById(id)
                .map(city -> {
                    city.setName(newCity.getName());
                    city.setPhoto(newCity.getPhoto());
                    return repository.save(city);
                })
                .orElseGet(() -> {
                    newCity.setId(id);
                    return repository.save(newCity);
                });
    }
}
