package com.gish.citylist.citylistcoreapi.model;

import javax.persistence.*;

@Entity
@Table(name = "city")
public class City {
    private @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    Long id;
    private String name;
    private String photo;

    public City() {
    }

    public City(String name, String photo) {
        this.name = name;
        this.photo = photo;
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
