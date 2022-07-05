package com.gish.citylist.citylistcoreapi.dto;

import com.gish.citylist.citylistcoreapi.model.City;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class CityDTO implements Serializable {
    private Long id;
    @NotNull(message = "City Name can not be blank")
    @Length(min = 1, max = 50, message = "Length of the City Name should be between 1 to 50")
    private String name;

    @NotNull(message = "City Photo URL can not be blank")
    @Length(min = 1, max = 1000, message = "Length of the City Photo URL should be between 1 to 1000")
    private String photo;

    public CityDTO() {
    }

    public CityDTO(final String name, final String photo) {
        this.name = name;
        this.photo = photo;
    }

    public CityDTO(Long id, String name, String photo) {
        this.id = id;
        this.name = name;
        this.photo = photo;
    }

    public CityDTO(final City city) {
        this.id = city.getId();
        this.name = city.getName();
        this.photo = city.getPhoto();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(final String photo) {
        this.photo = photo;
    }
}
