package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserSmallInfoUpdatePostRequest")
public class UserSmallInfoUpdatePostReq {
    @ApiModelProperty(name = "User Nickname", example = "떵유")
    private String nickname;

    @ApiModelProperty(name = "User Email", example = "ssafy1@ssafy.com")
    private String email;
}
