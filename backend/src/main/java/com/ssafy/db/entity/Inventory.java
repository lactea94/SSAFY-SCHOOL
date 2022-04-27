package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "inventory")
public class Inventory extends BaseEntity {
    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private Boolean wear;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
