package com.ssafy.api.controller;

import com.ssafy.api.response.user.CheckInDateListRes;
import com.ssafy.api.response.user.CheckOutDateListRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.CheckInRepository;
import com.ssafy.db.repository.CheckOutRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.api.response.user.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;

import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/v1/users")
public class UserController {
	
	@Autowired
	UserService userService;

	@Autowired
	CheckInRepository checkInRepository;

	@Autowired
	CheckOutRepository checkOutRepository;

	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	@PostMapping("/signup")
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		Status status = userService.getStatusByUserId(user.getId());
		StudentStatus studentStatus = userService.getStudentStatusByUserId(user.getId());
		return ResponseEntity.status(200).body(UserRes.of(user, status, studentStatus));
	}

	@GetMapping("/check-indate")
	@ApiOperation(value = "회원 입실 정보 조회", notes = "로그인한 회원 본인의 입실 정보를 응답한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity checkInDate(@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();
		Long userId = user.getId();
		List<CheckInDateListRes> checkInDateList = new ArrayList<>();
		List<CheckIn> list = checkInRepository.findAllByUserId(userId);

		Collections.reverse(list);

		for (CheckIn entity : list) {
			checkInDateList.add(new CheckInDateListRes(entity));
		}

		return new ResponseEntity<>(checkInDateList, HttpStatus.OK);
	}

	@GetMapping("/check-outdate")
	@ApiOperation(value = "회원 입실 정보 조회", notes = "로그인한 회원 본인의 입실 정보를 응답한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity checkOutDate(@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		User user = userDetails.getUser();
		Long userId = user.getId();
		List<CheckOutDateListRes> checkOutDateList = new ArrayList<>();
		List<CheckOut> list = checkOutRepository.findAllByUserId(userId);

		Collections.reverse(list);

		for (CheckOut entity : list) {
			checkOutDateList.add(new CheckOutDateListRes(entity));
		}

		return new ResponseEntity<>(checkOutDateList, HttpStatus.OK);
	}
}
