package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Table(name = "studentStatus")
public class StudentStatus extends BaseEntity {
    @Column(nullable = false)
    private int studentId;

    @Column(nullable = false)
    private int classNumber;

    @Column(nullable = false)
    private String teamCode;

    @Column(nullable = false)
    private String local;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
