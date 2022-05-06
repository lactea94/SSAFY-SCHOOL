package com.ssafy.api.controller;

import com.ssafy.api.request.bugreport.BugReportPostReq;
import com.ssafy.api.response.bugreport.BugReportListRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.BugReport;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BugReportRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Api(value = "버그리포트 API", tags = {"BugReport"})
@RestController
@RequestMapping("/v1/report")
public class BugReportController {
    @Autowired
    UserService userService;
    @Autowired
    BugReportRepository bugReportRepository;

    @ApiOperation(value = "버그리포트 작성", notes = "사용자가 버그리포트를 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작성 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping()
    public ResponseEntity postBugReport(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "버그리포트 정보", required = true)BugReportPostReq bugReportPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (user.getAdmin() != 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        bugReportRepository.save(BugReport.builder()
                .content(bugReportPostReq.getContent())
                .createdDate(LocalDateTime.now())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "버그리포트 전체 조회", notes = "사용자가 버그리포트 전체를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping()
    public ResponseEntity getBugReportList() {
        List<BugReport> list = bugReportRepository.findAll();
        List<BugReportListRes> bugReportList = new ArrayList<>();

        Collections.reverse(list);

        for (BugReport entity : list) {
            bugReportList.add(new BugReportListRes(entity));
        }

        return new ResponseEntity<>(bugReportList, HttpStatus.OK);
    }
}
