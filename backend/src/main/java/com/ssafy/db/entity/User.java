package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name = "user")
public class User extends BaseEntity{

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Boolean gender;

    @Column(nullable = false)
    private String email;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    // super : 0 / manager : 1 / normal : 2
    @Column(nullable = false)
    private Long admin;

    @OneToOne(mappedBy = "user")
    private Status status;

    @OneToOne(mappedBy = "user")
    private StudentStatus studentStatus;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<CheckIn> checkIns = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<CheckOut> checkOuts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Community> communities = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<GameNotice> gameNotices = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<BugReport> bugReports = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Inventory> inventories = new ArrayList<>();
}
