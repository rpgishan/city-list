package com.gish.citylist.citylistcoreapi.service;

import com.gish.citylist.citylistcoreapi.dto.CityDTO;

import java.util.List;

public interface CityService {
    List<CityDTO> findAll();

    CityDTO findById(Long id);

    CityDTO save(CityDTO cityDTO);

    CityDTO replaceCity(CityDTO newCity, Long id);
}
