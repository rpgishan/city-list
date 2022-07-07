package com.gish.citylist.citylistcoreapi.service;

import com.gish.citylist.citylistcoreapi.dto.CityDTO;
import com.gish.citylist.citylistcoreapi.dto.Response;
import com.gish.citylist.citylistcoreapi.exceptions.CityNotFoundException;
import com.gish.citylist.citylistcoreapi.model.City;
import com.gish.citylist.citylistcoreapi.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityServiceImpl implements CityService {
    private static final Logger logger = LoggerFactory.getLogger(CityServiceImpl.class);

    CityRepository repository;

    @Autowired
    public CityServiceImpl(final CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public Long count() {
        return repository.count();
    }

    @Override
    public List<CityDTO> findAll() {
        return repository.findAll().stream().map(CityDTO::new).collect(Collectors.toList());
    }

    @Override
    public Response<CityDTO> findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo,pageSize);

        Page<City> cityPage = repository.findAll(pageable);
        List<CityDTO> cityDTOList = cityPage.stream().map(CityDTO::new).collect(Collectors.toList());
        Response<CityDTO> response = new Response<>();
        response.setContent(cityDTOList);
        response.setPageNo(cityPage.getNumber());
        response.setPageSize(cityPage.getSize());
        response.setTotalElements(cityPage.getTotalElements());
        response.setTotalPages(cityPage.getTotalPages());
        response.setLast(cityPage.isLast());
        return response;
    }

    @Override
    public CityDTO findById(final Long id) {
        return new CityDTO(repository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(id)));
    }

    @Override
    public List<CityDTO> findByName(String name) {
        return repository.findByName(name).stream().map(CityDTO::new).collect(Collectors.toList());
    }

//    @Override
//    public Response<CityDTO> findByName(String name, int pageNo, int pageSize) {
//        Pageable pageable = PageRequest.of(pageNo,pageSize);
//
//        Page<City> cityPage = repository.findByName(name,pageable);
//        List<CityDTO> cityDTOList = cityPage.stream().map(CityDTO::new).collect(Collectors.toList());
//        Response<CityDTO> response = new Response<>();
//        response.setContent(cityDTOList);
//        response.setPageNo(cityPage.getNumber());
//        response.setPageSize(cityPage.getSize());
//        response.setTotalElements(cityPage.getTotalElements());
//        response.setTotalPages(cityPage.getTotalPages());
//        response.setLast(cityPage.isLast());
//        return response;
//    }

    @Override
    public CityDTO save(final CityDTO cityDTO) {
//        opCoValidationService.opCoDTOValidator.validate(opCoDTO);
//        logger.info("successfully validated opCoDTO with opco number {}", opCoDTO.getOpCoNumber());
//        Map<String, String> duplicateOpCoFields = new HashMap<>();
//        OpCoUtil.checkDuplicateOpCoNumberOnInsert(isOpCoNumberExist(opCoDTO.getOpCoNumber()), opCoDTO, duplicateOpCoFields);
//        OpCoUtil.checkDuplicateWorkdayNameOnInsert(isWorkdayNameExist(opCoDTO.getWorkdayName()), opCoDTO, duplicateOpCoFields);
//        OpCoUtil.checkDuplicateSapEntityIdOnInsert(isSapEntityIdExist(opCoDTO.getSapEntityId()), opCoDTO, duplicateOpCoFields);
//        OpCoUtil.checkDuplicateSusEntityIdOnInsert(isSusEntityIdExist(opCoDTO.getSusEntityId()), opCoDTO, duplicateOpCoFields);
//        OpCoUtil.checkDuplicateAdpPayGroupOnInsert(isAdpPayGroupExist(opCoDTO.getAdpPayGroup()), opCoDTO, duplicateOpCoFields);
//        OpCoUtil.checkDuplicateAdpLocationIdOnInsert(isAdpLocationIdExist(opCoDTO.getAdpLocationId()), opCoDTO, duplicateOpCoFields);
//        OpCoUtil.checkDuplicateOpCoFields(duplicateOpCoFields, opCoDTO);
//        logger.info("no duplicate fields found on insertion for the opCoDTO with opco number {}", opCoDTO.getOpCoNumber());
        City city = new City();
        city.setName(cityDTO.getName());
        city.setPhoto(cityDTO.getPhoto());
        logger.info("saving city with city name {}", cityDTO.getName());
        city = repository.save(city);
        logger.info("successfully saved city with city name {}", city.getName());
        return new CityDTO(city);
    }

    @Override
    public CityDTO updateCity(final CityDTO newCity, final Long id) {
// TODO fix
        return repository.findById(id)
                .map(city -> {
                    city.setName(newCity.getName());
                    city.setPhoto(newCity.getPhoto());
                    return new CityDTO(repository.save(city));
                })
                .orElseGet(() -> {
                    final City city = new City(id, newCity.getName(), newCity.getPhoto());
                    return new CityDTO(repository.save(city));
                });
    }
}
