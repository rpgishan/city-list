package com.gish.citylist.citylistcoreapi.controller;

import com.gish.citylist.citylistcoreapi.dto.CityDTO;
import com.gish.citylist.citylistcoreapi.service.CityService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CityController {
    private final CityService service;

    public CityController(final CityService service) {
        this.service = service;
    }

    @GetMapping("/city")
    public Iterable<CityDTO> all() {
        return service.findAll();
    }

    @PostMapping("/city")
    public CityDTO newCity(@RequestBody final CityDTO cityDTO) {
        return service.save(cityDTO);
    }

    @GetMapping("/city/{id}")
    public CityDTO one(@PathVariable final Long id) {
        return service.findById(id);
    }

    @PutMapping("/city/{id}")
    public CityDTO replaceCity(@RequestBody final CityDTO newCity, @PathVariable final Long id) {
        return service.replaceCity(newCity, id);
    }
}
