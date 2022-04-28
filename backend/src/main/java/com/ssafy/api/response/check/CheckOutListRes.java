package com.ssafy.api.response.check;

import com.ssafy.db.entity.CheckOut;
import com.ssafy.db.entity.StudentStatus;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@ApiModel("CheckOutListGetResponse")
public class CheckOutListRes {
    @ApiModelProperty(name = "seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "사용자 이름", example = "이싸피")
    private String username;

    @ApiModelProperty(name = "사용자 학번", example = "0610000")
    private String studentId;

    @ApiModelProperty(name = "퇴실 날짜", example = "2022-04-28")
    private LocalDate createdDate;

    @ApiModelProperty(name = "퇴실 시간", example = "15:50:15")
    private LocalTime createdTime;

    public CheckOutListRes(CheckOut entity) {
        User user = entity.getUser();
        StudentStatus studentStatus = user.getStudentStatus();
        this.id = entity.getId();
        this.username = user.getName();
        this.studentId = studentStatus.getStudentId();
        this.createdDate = entity.getCreatedDate();
        this.createdTime = entity.getCreatedTime();
    }

}
