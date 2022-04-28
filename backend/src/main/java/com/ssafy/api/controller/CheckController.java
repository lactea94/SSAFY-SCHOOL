package com.ssafy.api.controller;

import com.ssafy.api.response.check.CheckInListRes;
import com.ssafy.api.response.check.CheckOutListRes;
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

    @GetMapping("/in")
    @ApiOperation(value = "입실체크 전체 조회", notes = "권한 있는 사용자가 입실체크 한 전체 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
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

    @PostMapping("/in")
    @ApiOperation(value = "입실체크", notes = "사용자가 입실체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작성 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity postCheckIn(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        checkInRepository.save(CheckIn.builder()
                .createdDate(LocalDate.now())
                .createdTime(LocalTime.now())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/in/{userId}")
    @ApiOperation(value = "사용자별 입실체크 기록 확인", notes = "권한 있는 사용자가 사용자별 입실체크 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
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

    @GetMapping("/out")
    @ApiOperation(value = "퇴실체크 전체 조회", notes = "권한 있는 사용자가 퇴실체크 한 전체 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
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

    @PostMapping("/out")
    @ApiOperation(value = "퇴실체크", notes = "사용자가 퇴실체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작성 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity postCheckOut(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        User user = userDetails.getUser();
        checkOutRepository.save(CheckOut.builder()
                .createdDate(LocalDate.now())
                .createdTime(LocalTime.now())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/out/{userId}")
    @ApiOperation(value = "사용자별 퇴실체크 기록 확인", notes = "권한 있는 사용자가 사용자별 퇴실체크 기록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
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
