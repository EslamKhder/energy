package com.spring.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order extends PublicData{

    @Column(name = "price")
    private double price;

    private Long time;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_Category")
    private Category category;

    @Column(name = "image")
    private String img;
}
