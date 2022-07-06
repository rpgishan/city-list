package com.gish.citylist.citylistcoreapi.service;

import com.gish.citylist.citylistcoreapi.dto.CityDTO;
import com.gish.citylist.citylistcoreapi.dto.Response;

import java.util.List;

public interface CityService {
    Long count();

    List<CityDTO> findAll();

    Response<CityDTO> findAll(int pageNo, int pageSize);

    CityDTO findById(Long id);

    CityDTO save(CityDTO cityDTO);

    CityDTO updateCity(CityDTO newCity, Long id);
}
