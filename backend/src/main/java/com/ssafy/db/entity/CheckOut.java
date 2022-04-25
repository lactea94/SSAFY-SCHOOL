package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "checkOut")
public class CheckOut extends BaseEntity {

    @Column(nullable = false, length = 500)
    private String content;

    // 이게 될까 의문중
    @Column(nullable = false)
    private LocalDate createdDate;

    @Column(nullable = false)
    private LocalDateTime createTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public CheckOut(LocalDate createdDate, LocalDateTime createTime, String content, User user) {
        this.createdDate = createdDate;
        this.createTime = createTime;
        this.content = content;
        this.user = user;
    }
}
