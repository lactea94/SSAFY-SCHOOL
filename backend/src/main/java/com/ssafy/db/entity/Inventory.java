package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "inventory")
public class Inventory extends BaseEntity {
    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private Boolean wear;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public Inventory(String item, Boolean wear, User user) {
        this.item = item;
        this.wear = wear;
        this.user = user;
    }
}
