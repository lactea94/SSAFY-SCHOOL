package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = "status")
public class Status extends BaseEntity {
    @Column(nullable = true)
    private String location;

    @Column(nullable = true)
    private String codi;

    @Column(nullable = false)
    private int mileage;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
