package com.ssafy.api.response.user;

import com.ssafy.db.entity.Status;
import com.ssafy.db.entity.StudentStatus;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserInfoListResponse")
public class UserInfoListRes {
    @ApiModelProperty(name = "User PK")
    private Long id;

    @ApiModelProperty(name="User ID")
    private String userId;

    @ApiModelProperty(name = "User Nickname")
    private String nickname;

    @ApiModelProperty(name = "User Name")
    private String name;

    @ApiModelProperty(name = "User Gender")
    private Boolean gender;

    @ApiModelProperty(name = "User Email")
    private String email;

    @ApiModelProperty(name = "User Admin")
    private Long admin;

    @ApiModelProperty(name = "User Status Total Mileage")
    private Long totalMileage;

    @ApiModelProperty(name = "User Status Remain Mileage")
    private Long remainMileage;

    @ApiModelProperty(name = "User StudentStatus Student Id")
    private String studentId;

    @ApiModelProperty(name = "User StudentStatus Class Number")
    private String classNumber;

    @ApiModelProperty(name = "User StudentStatus Team Code")
    private String teamCode;

    @ApiModelProperty(name = "User StudentStatus Local")
    private String local;

    public UserInfoListRes(User entity) {
        Status status = entity.getStatus();
        StudentStatus studentStatus = entity.getStudentStatus();
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.nickname = entity.getNickname();
        this.name = entity.getName();
        this.gender = entity.getGender();
        this.email = entity.getEmail();
        this.admin = entity.getAdmin();
        this.totalMileage = status.getTotalMileage();
        this.remainMileage = status.getRemainMileage();
        this.studentId = studentStatus.getStudentId();
        this.classNumber = studentStatus.getClassNumber();
        this.teamCode = studentStatus.getTeamCode();
        this.local = studentStatus.getLocal();
    }
}
