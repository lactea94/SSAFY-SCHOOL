package com.ssafy.api.controller;

import com.ssafy.api.request.gamenotice.GameNoticePostReq;
import com.ssafy.api.response.community.CommunityListRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Community;
import com.ssafy.db.entity.GameNotice;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.GameNoticeRepository;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
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

@Api(value = "게임 공지사항 API", tags = {"GameNotice"})
@AllArgsConstructor
@RestController
@RequestMapping("/v1/notice")
public class GameNoticeController {
    @Autowired
    UserService userService;

    @Autowired
    GameNoticeRepository gameNoticeRepository;

    @ApiOperation(value = "게임 공지사항 작성", notes = "게임 관련 공지사항을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작성 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping()
    public ResponseEntity postGameNotice(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "게임 공자사항 정보", required = true) GameNoticePostReq gameNoticePostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if(user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        gameNoticeRepository.save(GameNotice.builder()
                .title(gameNoticePostReq.getTitle())
                .content(gameNoticePostReq.getContent())
                .createdDate(LocalDateTime.now())
                .updatedDate(LocalDateTime.now())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "게임 공지사항 전체 조회", notes = "모든 게임 공지사항을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping()
    public ResponseEntity getGameNoticeList() {
        List<GameNotice> list = gameNoticeRepository.findAll();
//        List<CommunityListRes> communityList = new ArrayList<>();
//
//        Collections.reverse(list);
//
//        for (Community entity : list) {
//            communityList.add(new CommunityListRes(entity));
//        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
