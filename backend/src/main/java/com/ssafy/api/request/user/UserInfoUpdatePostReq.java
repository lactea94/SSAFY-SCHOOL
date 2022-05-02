package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserInfoUpdatePostRequest")
public class UserInfoUpdatePostReq {
    @ApiModelProperty(name = "User Nickname", example = "떵유")
    private String nickname;

    @ApiModelProperty(name = "User Name", example = "김동유")
    private String name;

    @ApiModelProperty(name = "User Gender", example = "True")
    private Boolean gender;

    @ApiModelProperty(name = "User Admin", example = "2")
    private Long admin;

    @ApiModelProperty(name = "Status Total Mileage", example = "200000")
    private Long totalMileage;

    @ApiModelProperty(name = "Status Remain Mileage", example = "100000")
    private Long remainMileage;

    @ApiModelProperty(name = "StudentStatus StudentId", example = "0610000")
    private String studentId;

    @ApiModelProperty(name = "StudentStatus ClassNumber", example = "2")
    private String classNumber;

    @ApiModelProperty(name = "StudentStatus Team Code", example = "C000")
    private String teamCode;

    @ApiModelProperty(name = "StudentStatus Local", example = "Gwangju")
    private String local;
}
