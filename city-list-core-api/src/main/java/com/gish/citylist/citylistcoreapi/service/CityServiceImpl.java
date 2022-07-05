package com.gish.citylist.citylistcoreapi.service;

import com.gish.citylist.citylistcoreapi.dto.CityDTO;
import com.gish.citylist.citylistcoreapi.exceptions.CityNotFoundException;
import com.gish.citylist.citylistcoreapi.model.City;
import com.gish.citylist.citylistcoreapi.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<CityDTO> findAll() {
        return repository.findAll().stream().map(CityDTO::new).collect(Collectors.toList());
    }

    @Override
    public CityDTO findById(final Long id) {
        return new CityDTO(repository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(id)));
    }

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
    public CityDTO replaceCity(final CityDTO newCity, final Long id) {
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
