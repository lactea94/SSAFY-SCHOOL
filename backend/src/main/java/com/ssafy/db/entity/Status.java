package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "status")
public class Status extends BaseEntity {
    @Column(nullable = true, length = 100)
    private String location;

    @Column(nullable = false)
    private int totalMileage;

    @Column(nullable = false)
    private int remainMileage;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
