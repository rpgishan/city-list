package com.gish.citylist.citylistcoreapi.model;

import javax.persistence.*;

@Entity
@Table(name = "city")
public class City {
    private @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_sequence_generator")
    @SequenceGenerator(name = "city_sequence_generator", sequenceName = "city_sequence", initialValue = 1001, allocationSize = 1)
    Long id;
    private String name;
    private String photo;

    public City() {
    }

    public City(String name, String photo) {
        this.name = name;
        this.photo = photo;
    }

    public City(Long id, String name, String photo) {
        this.id = id;
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
