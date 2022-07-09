package com.gish.citylist.citylistcoreapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class City extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_sequence_generator")
    @SequenceGenerator(name = "city_sequence_generator", sequenceName = "city_sequence", initialValue = 1001, allocationSize = 1)
    private Long id;

    private String name;

    private String photo;

    public City() {
    }

    public City(final String name, final String photo) {
        this.name = name;
        this.photo = photo;
    }

    public City(final Long id, final String name, final String photo) {
        this.id = id;
        this.name = name;
        this.photo = photo;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
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
