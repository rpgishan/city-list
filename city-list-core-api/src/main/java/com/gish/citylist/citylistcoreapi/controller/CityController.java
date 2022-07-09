package com.gish.citylist.citylistcoreapi.controller;

import com.gish.citylist.citylistcoreapi.dto.CityDTO;
import com.gish.citylist.citylistcoreapi.dto.Response;
import com.gish.citylist.citylistcoreapi.service.CityService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.gish.citylist.citylistcoreapi.util.Constants.DEFAULT_PAGE_NUMBER;
import static com.gish.citylist.citylistcoreapi.util.Constants.DEFAULT_PAGE_SIZE;

@RestController
@CrossOrigin
@RequestMapping("/city")
public class CityController {
    private final CityService service;

    public CityController(final CityService service) {
        this.service = service;
    }

    @GetMapping("/count")
    public Long count() {
        return service.count();
    }

    @GetMapping("/all")
    public List<CityDTO> all() {
        return service.findAll();
    }

    @GetMapping("/page")
    public Response<CityDTO> all(
            @RequestParam(defaultValue = DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE, required = false) int pageSize) {
        return service.findAll(pageNo, pageSize);
    }

    @GetMapping("/name")
    public List<CityDTO> name(@RequestParam String name) {
        return service.findByName(name);
    }

//    @GetMapping("/namepage")
//    public Response<CityDTO> namepage(
//            @RequestParam String name,
//            @RequestParam(defaultValue = DEFAULT_PAGE_NUMBER, required = false) int pageNo,
//            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE, required = false) int pageSize) {
//        return service.findByName(name, pageNo, pageSize);
//    }

    @PostMapping("/new")
    public CityDTO newCity(@RequestBody final CityDTO cityDTO) {
        return service.save(cityDTO);
    }

    @GetMapping("/single")
    public CityDTO single(@RequestParam final Long id) {
        return service.findById(id);
    }

    @PutMapping("/update")
    public CityDTO updateCity(@RequestBody final CityDTO newCity, @RequestParam final Long id) {
        return service.updateCity(newCity, id);
    }
}
