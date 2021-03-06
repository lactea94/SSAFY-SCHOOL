package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "studentStatus")
public class StudentStatus extends BaseEntity {
    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String classNumber;

    @Column(nullable = false, length = 10)
    private String teamCode;

    @Column(nullable = false, length = 50)
    private String local;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
