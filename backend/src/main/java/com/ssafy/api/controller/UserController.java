package com.ssafy.api.controller;

import com.ssafy.api.request.user.UserInfoUpdatePostReq;
import com.ssafy.api.request.user.UserPasswordUpdatePostReq;
import com.ssafy.api.response.user.CheckInDateListRes;
import com.ssafy.api.response.user.CheckOutDateListRes;
import com.ssafy.api.response.user.UserInfoListRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import io.swagger.annotations.*;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.api.response.user.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;

import springfox.documentation.annotations.ApiIgnore;

import java.util.*;

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
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

	@Autowired
	CheckInRepository checkInRepository;

	@Autowired
	CheckOutRepository checkOutRepository;

	@Autowired
	StatusRepository statusRepository;

	@Autowired
	StudentStatusRepository studentStatusRepository;

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

	@ApiOperation(value = "아이디 중복 체크", notes = "아이디 중복 여부를 체크한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 409, message = "중복된 아이디 존재"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/duplicate-check-id")
	public ResponseEntity duplicatedCheckId(@RequestBody @ApiParam(value = "체크할 아이디", required = true) Map<String, Object> body) {
		String userId = body.get("id").toString();
		User user = userRepository.findByUserId(userId).orElse(null);

		if (user == null) {
			return new ResponseEntity(HttpStatus.OK);
		} else {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
	}

	@ApiOperation(value = "이메일 중복 체크", notes = "이메일 중복 여부를 체크한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 409, message = "중복된 이메일 존재"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/duplicate-check-email")
	public ResponseEntity duplicateCheckEmail(@RequestBody @ApiParam(value = "체크할 이메일", required = true) Map<String, Object> body) {
		String email = body.get("email").toString();
		User user = userRepository.findByEmail(email).orElse(null);

		if(user == null) {
			return new ResponseEntity(HttpStatus.OK);
		} else {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
	}

	@ApiOperation(value = "닉네임 중복체크", notes = "닉네임 중복 여부를 체크한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 409, message = "중복된 닉네임 존재"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/duplicate-check-nickname")
	public ResponseEntity duplicateCheckNickname(@RequestBody @ApiParam(value = "체크할 닉네임", required = true) Map<String, Object> body) {
		String nickname = body.get("nickname").toString();
		User user = userRepository.findByNickname(nickname).orElse(null);

		if (user == null) {
			return new ResponseEntity(HttpStatus.OK);
		} else {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
	}

	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	@GetMapping("/me")
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

	@ApiOperation(value = "비밀번호 변경", notes = "현재 사용자의 비밀번호를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "잘못된 사용자의 요청"),
			@ApiResponse(code = 403, message = "토큰 없음, 인가 불가"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/password-update")
	public ResponseEntity updatePassword(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "새로운 비밀번호", required = true)UserPasswordUpdatePostReq userPasswordUpdatePostReq) {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		user.setPassword(passwordEncoder.encode(userPasswordUpdatePostReq.getPassword()));
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}

	@ApiOperation(value = "회원 입실 정보 조회", notes = "로그인한 회원 본인의 입실 정보를 응답한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/check-indate")
	public ResponseEntity getInDate(@ApiIgnore Authentication authentication) {
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


	@ApiOperation(value = "회원 입실 정보 조회", notes = "로그인한 회원 본인의 입실 정보를 응답한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/check-outdate")
	public ResponseEntity getOutDate(@ApiIgnore Authentication authentication) {
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

	@ApiOperation(value = "전체 사용자 정보 조회", notes = "권한 있는 사용자가 전체 사용자 정보를 조회한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "조회 성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "권한 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping()
	public ResponseEntity getUserInfoList(@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		User user = userDetails.getUser();
		if (user.getAdmin() == 2) {
			return new ResponseEntity(HttpStatus.FORBIDDEN);
		}
		List<UserInfoListRes> userInfoList = new ArrayList<>();
		List<User> list = userRepository.findUserList();

		for (User entity : list) {
			userInfoList.add(new UserInfoListRes(entity));
		}
		return new ResponseEntity<>(userInfoList, HttpStatus.OK);
	}

	@ApiOperation(value = "사용자 정보 변경", notes = "권한 있는 사용자가 사용자 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 403, message = "권한 없음"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@ApiImplicitParam(name = "userId", value = "사용자 seq", required = true)
	@PutMapping("/update/{userId}")
	public ResponseEntity updateUserInfo(@ApiIgnore Authentication authentication, @PathVariable Long userId, @RequestBody @ApiParam(value = "회원정보 수정 데이터", required = true) UserInfoUpdatePostReq userInfoUpdatePostReq) {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		User admin = userDetails.getUser();
		if (admin.getAdmin() == 2) {
			return new ResponseEntity(HttpStatus.FORBIDDEN);
		}
		User user = userService.getUserById(userId);
		// 이게 옵셔널이 아닌데 어떻게 해결할까? 그냥 써야하나?
		Status status = statusRepository.findByUserId(userId).orElse(null);
		StudentStatus studentStatus = studentStatusRepository.findByUserId(userId).orElse(null);

		if (status == null || studentStatus == null) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}

		user.setNickname(userInfoUpdatePostReq.getNickname());
		user.setName(userInfoUpdatePostReq.getName());
		user.setGender(userInfoUpdatePostReq.getGender());
		user.setAdmin(userInfoUpdatePostReq.getAdmin());
		userRepository.save(user);
		status.setTotalMileage(userInfoUpdatePostReq.getTotalMileage());
		status.setRemainMileage(userInfoUpdatePostReq.getRemainMileage());
		statusRepository.save(status);
		studentStatus.setStudentId(userInfoUpdatePostReq.getStudentId());
		studentStatus.setClassNumber(userInfoUpdatePostReq.getClassNumber());
		studentStatus.setTeamCode(userInfoUpdatePostReq.getTeamCode());
		studentStatus.setLocal(userInfoUpdatePostReq.getLocal());
		studentStatusRepository.save(studentStatus);
		return new ResponseEntity(HttpStatus.OK);
	}
}
