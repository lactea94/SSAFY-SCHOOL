package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "checkIn")
public class CheckIn extends BaseEntity {

    // 이게 될까 의문중
    @Column(nullable = false)
    private LocalDate createdDate;

    @Column(nullable = false)
    private LocalTime createdTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public CheckIn(LocalDate createdDate, LocalTime createdTime, User user) {
        this.createdDate = createdDate;
        this.createdTime = createdTime;
        this.user = user;
    }

}
