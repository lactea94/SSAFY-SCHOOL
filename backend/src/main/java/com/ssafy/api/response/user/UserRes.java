package com.ssafy.api.response.user;

import com.ssafy.db.entity.*;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID")
	String userId;

	@ApiModelProperty(name = "User Nickname")
	String nickname;

	@ApiModelProperty(name = "User Name")
	String name;

	@ApiModelProperty(name = "User Gender")
	Boolean gender;

	@ApiModelProperty(name = "User Email")
	String email;

	@ApiModelProperty(name = "User Admin")
	Long admin;

	@ApiModelProperty(name = "User Status Total Mileage")
	Long totalMileage;

	@ApiModelProperty(name = "User Status Remain Mileage")
	Long remainMileage;

	@ApiModelProperty(name = "User StudentStatus Student Id")
	String studentId;

	@ApiModelProperty(name = "User StudentStatus Class Number")
	String classNumber;

	@ApiModelProperty(name = "User StudentStatus Team Code")
	String teamCode;

	@ApiModelProperty(name = "User StudentStatus Local")
	String local;

	public static UserRes of(User user, Status status, StudentStatus studentStatus) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		res.setNickname(user.getNickname());
		res.setName(user.getName());
		res.setGender(user.getGender());
		res.setEmail(user.getEmail());
		res.setAdmin(user.getAdmin());
		res.setTotalMileage(status.getTotalMileage());
		res.setRemainMileage(status.getRemainMileage());
		res.setStudentId(studentStatus.getStudentId());
		res.setClassNumber(studentStatus.getClassNumber());
		res.setTeamCode(studentStatus.getTeamCode());
		res.setLocal(studentStatus.getLocal());
		return res;
	}
}
