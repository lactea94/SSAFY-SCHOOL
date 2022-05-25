package com.ssafy.api.controller;

import com.ssafy.api.response.check.CheckInListRes;
import com.ssafy.api.response.check.CheckInRes;
import com.ssafy.api.response.check.CheckOutListRes;
import com.ssafy.api.response.check.CheckOutRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.CheckIn;
import com.ssafy.db.entity.CheckOut;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CheckInRepository;
import com.ssafy.db.repository.CheckOutRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Api(value = "입퇴실 API", tags = {"Check."})
@AllArgsConstructor
@RestController
@RequestMapping("v1/check")
public class CheckController {
    @Autowired
    UserService userService;

    @Autowired
    CheckOutRepository checkOutRepository;

    @Autowired
    CheckInRepository checkInRepository;

    @ApiOperation(value = "입실체크 전체 조회", notes = "권한 있는 사용자가 입실체크 한 전체 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/in")
    public ResponseEntity getCheckInList(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        if (user.getAdmin() == 2) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<CheckInListRes> checkInList = new ArrayList<>();
        List<CheckIn> list = checkInRepository.findCheckInList();

        for (CheckIn entity : list) {
            checkInList.add(new CheckInListRes(entity));
        }

        return new ResponseEntity<>(checkInList, HttpStatus.OK);
    }

    @ApiOperation(value = "입실체크", notes = "사용자가 입실체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 201, message = "입실 기록 생성"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PutMapping("/in")
    public ResponseEntity postCheckIn(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        CheckIn checkIn = checkInRepository.findByCreatedDateAndUserId(LocalDate.now(), user.getId()).orElse(null);
        if (checkIn == null) {
            checkInRepository.save(CheckIn.builder()
                    .createdDate(LocalDate.now())
                    .createdTime(LocalTime.now())
                    .user(user)
                    .build());
            return new ResponseEntity(HttpStatus.CREATED);
        }
        checkIn.setCreatedTime(LocalTime.now());
        checkInRepository.save(checkIn);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "당일 입실체크 기록 확인", notes = "사용자 본인의 당일 입실 기록을 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/in/me")
    public ResponseEntity getCheckIn(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        CheckIn checkIn = checkInRepository.findByCreatedDateAndUserId(LocalDate.now(), user.getId()).orElse(null);
        if (checkIn == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        CheckInRes checkInRes = new CheckInRes(checkIn);
        return new ResponseEntity<>(checkInRes, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자별 입실체크 기록 확인", notes = "권한 있는 사용자가 사용자별 입실체크 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/in/{userId}")
    public ResponseEntity getCheckInByUser(@ApiIgnore Authentication authentication, @PathVariable Long userId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        if (user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        if (userService.getUserById(userId) == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        List<CheckInListRes> checkInList = new ArrayList<>();
        List<CheckIn> list = checkInRepository.findAllByUserId(userId);

        for (CheckIn entity : list) {
            checkInList.add(new CheckInListRes(entity));
        }
        return new ResponseEntity<>(checkInList, HttpStatus.OK);
    }

    @ApiOperation(value = "퇴실체크 전체 조회", notes = "권한 있는 사용자가 퇴실체크 한 전체 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/out")
    public ResponseEntity getCheckOutList(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        if (user.getAdmin() == 2) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<CheckOutListRes> checkOutList = new ArrayList<>();
        List<CheckOut> list = checkOutRepository.findCheckOutList();

        for (CheckOut entity : list) {
            checkOutList.add(new CheckOutListRes(entity));
        }
        return new ResponseEntity<>(checkOutList, HttpStatus.OK);
    }

    @ApiOperation(value = "퇴실체크", notes = "사용자가 퇴실체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 201, message = "퇴실 기록 생성"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PutMapping("/out")
    public ResponseEntity postCheckOut(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        CheckOut checkOut = checkOutRepository.findByCreatedDateAndUserId(LocalDate.now(), user.getId()).orElse(null);
        if (checkOut == null) {
            checkOutRepository.save(CheckOut.builder()
                    .createdDate(LocalDate.now())
                    .createdTime(LocalTime.now())
                    .user(user)
                    .build());
            return new ResponseEntity(HttpStatus.CREATED);
        }
        checkOut.setCreatedTime(LocalTime.now());
        checkOutRepository.save(checkOut);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "당일 퇴실체크 기록 확인", notes = "사용자 본인의 당일 퇴실 기록을 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/out/me")
    public ResponseEntity getCheckOut(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        CheckOut checkOut = checkOutRepository.findByCreatedDateAndUserId(LocalDate.now(), user.getId()).orElse(null);
        if (checkOut == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        CheckOutRes checkOutRes = new CheckOutRes(checkOut);
        return new ResponseEntity<>(checkOutRes, HttpStatus.OK);
    }

    @ApiOperation(value = "사용자별 퇴실체크 기록 확인", notes = "권한 있는 사용자가 사용자별 퇴실체크 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/out/{userId}")
    public ResponseEntity getCheckOutByUser(@ApiIgnore Authentication authentication, @PathVariable Long userId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        if (user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        if (userService.getUserById(userId) == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        List<CheckOutListRes> checkOutList = new ArrayList<>();
        List<CheckOut> list = checkOutRepository.findAllByUserId(userId);

        for (CheckOut entity : list) {
            checkOutList.add(new CheckOutListRes(entity));
        }
        return new ResponseEntity<>(checkOutList, HttpStatus.OK);
    }
}
