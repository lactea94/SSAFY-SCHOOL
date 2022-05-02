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
	@ApiModelProperty(name = "User PK", example = "1")
	Long id;

	@ApiModelProperty(name="User ID", example = "ssafy")
	String userId;

	@ApiModelProperty(name = "User Nickname", example = "떵유")
	String nickname;

	@ApiModelProperty(name = "User Name", example = "김싸피")
	String name;

	@ApiModelProperty(name = "User Gender", example = "true")
	Boolean gender;

	@ApiModelProperty(name = "User Email", example = "ssafy1@ssafy.com")
	String email;

	@ApiModelProperty(name = "User Admin", example = "2")
	Long admin;

	@ApiModelProperty(name = "User Status Total Mileage", example = "1000000")
	Long totalMileage;

	@ApiModelProperty(name = "User Status Remain Mileage", example = "100000")
	Long remainMileage;

	@ApiModelProperty(name = "User StudentStatus Student Id", example = "0610000")
	String studentId;

	@ApiModelProperty(name = "User StudentStatus Class Number", example = "2")
	String classNumber;

	@ApiModelProperty(name = "User StudentStatus Team Code", example = "C200")
	String teamCode;

	@ApiModelProperty(name = "User StudentStatus Local", example = "Gwangju")
	String local;

	public static UserRes of(User user, Status status, StudentStatus studentStatus) {
		UserRes res = new UserRes();
		res.setId(user.getId());
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
