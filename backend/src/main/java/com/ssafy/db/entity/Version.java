package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "version")
public class Version extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String version;
}
