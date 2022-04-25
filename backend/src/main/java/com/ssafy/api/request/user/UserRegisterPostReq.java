package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String id;

	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;

	@ApiModelProperty(name = "유저 name", example = "your_name")
	String name;

	@ApiModelProperty(name = "유저 nickname", example = "your_nickname")
	String nickname;

	@ApiModelProperty(name = "유저 gender", example = "your_gender")
	Boolean gender;

	@ApiModelProperty(name = "유저 email", example = "your_email")
	String email;

	@ApiModelProperty(name = "유저 admin", example = "2")
	int admin;
}
