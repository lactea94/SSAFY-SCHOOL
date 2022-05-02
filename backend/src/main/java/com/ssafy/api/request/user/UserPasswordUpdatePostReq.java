package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPasswordUpdatePostRequest")
public class UserPasswordUpdatePostReq {
    @ApiModelProperty(name = "User Password")
    private String password;
}
