package com.gish.citylist.citylistcoreapi.dto;

import com.gish.citylist.citylistcoreapi.model.City;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public class CityDTO {
    @NotNull(message = "City Name can not be blank")
    @Length(min = 1, max = 50, message = "Length of the City Name should be between 1 to 50")
    private String name;

    @NotNull(message = "City Photo URL can not be blank")
    @Length(min = 1, max = 1000, message = "Length of the City Photo URL should be between 1 to 1000")
    private String photo;

    public CityDTO() {
    }

    public CityDTO(String name, String photo) {
        this.name = name;
        this.photo = photo;
    }

    public CityDTO(City city) {
        this.name = city.getName();
        this.photo = city.getPhoto();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
