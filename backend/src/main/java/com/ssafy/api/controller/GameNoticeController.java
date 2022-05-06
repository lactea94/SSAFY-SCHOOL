package com.ssafy.api.controller;

import com.ssafy.api.request.gamenotice.GameNoticePostReq;
import com.ssafy.api.response.community.CommunityListRes;
import com.ssafy.api.response.gamenotice.GameNoticeListRes;
import com.ssafy.api.response.gamenotice.GameNoticeRes;
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
        List<GameNoticeListRes> gameNoticeList = new ArrayList<>();

        Collections.reverse(list);

        for (GameNotice entity : list) {
            gameNoticeList.add(new GameNoticeListRes(entity));
        }
        return new ResponseEntity<>(gameNoticeList, HttpStatus.OK);
    }

    @ApiOperation(value = "게임 공지사항 조회", notes = "게임 공지사항 세부내용을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "noticeId", value = "게임공지사항 seq", required = true, dataType = "Long")
    @GetMapping("/{noticeId}")
    public ResponseEntity getGameNotice(@PathVariable Long noticeId) {
        GameNotice gameNotice = gameNoticeRepository.findById(noticeId).orElse(null);
        if (gameNotice == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        GameNoticeRes gameNoticeRes = new GameNoticeRes(gameNotice);
        return new ResponseEntity<>(gameNoticeRes, HttpStatus.OK);
    }

    @ApiOperation(value = "게임 공지사항 수정", notes = "게임 공지사항을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "noticeId", value = "게임공지사항 seq", required = true, dataType = "Long")
    @PutMapping("/{noticeId}")
    public ResponseEntity editGameNotice(@ApiIgnore Authentication authentication, @PathVariable Long noticeId, @RequestBody @ApiParam(value = "게시글 수정 내용", required = true)GameNoticePostReq gameNoticePostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        GameNotice gameNotice = gameNoticeRepository.findById(noticeId).orElse(null);
        if (gameNotice == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        if (user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        gameNotice.setTitle(gameNoticePostReq.getTitle());
        gameNotice.setContent(gameNoticePostReq.getContent());
        gameNotice.setUpdatedDate(LocalDateTime.now());
        gameNoticeRepository.save(gameNotice);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "게임 공지사항 삭제", notes = "게임 공지사항을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "noticeId", value = "게임 공지사항 seq", required = true, dataType = "Long")
    @DeleteMapping("/{noticeId}")
    public ResponseEntity deleteGameNotice(@ApiIgnore Authentication authentication, @PathVariable Long noticeId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        GameNotice gameNotice = gameNoticeRepository.findById(noticeId).orElse(null);
        if (gameNotice == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        if (user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        gameNoticeRepository.deleteById(noticeId);
        return new ResponseEntity(HttpStatus.OK);
    }


}
