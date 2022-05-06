package com.ssafy.api.controller;

import com.ssafy.api.request.community.CommunityPostReq;
import com.ssafy.api.response.community.CommunityListRes;
import com.ssafy.api.response.community.CommunityRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Community;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CommunityRepository;
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
import java.util.Optional;

@Api(value = "게시판 API", tags = {"Community"})
@AllArgsConstructor
@RestController
@RequestMapping("/v1/community")
public class CommunityController {
    @Autowired
    UserService userService;

    @Autowired
    CommunityRepository communityRepository;

    @ApiOperation(value = "게시판 작성", notes = "사용자가 게시판을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작성 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping()
    public ResponseEntity post(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "게시글 내용", required = true)CommunityPostReq communityPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        communityRepository.save(Community.builder()
                .title(communityPostReq.getTitle())
                .content(communityPostReq.getContent())
                .createdDate(LocalDateTime.now())
                .updateDate(LocalDateTime.now())
                .isNotice(communityPostReq.getIsNotice())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "게시판 전체 조회", notes = "모든 게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping()
    public ResponseEntity getList() {
        List<Community> list = communityRepository.findAllByIsNoticeFalse();
        List<CommunityListRes> communityList = new ArrayList<>();

        Collections.reverse(list);

        for (Community entity : list) {
            communityList.add(new CommunityListRes(entity));
        }
        return new ResponseEntity<>(communityList, HttpStatus.OK);
    }

    @ApiOperation(value = "특정 게시글 조회", notes = "특정 게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "community seq", required = true, dataType = "Long")
    @GetMapping("/{communityId}")
    public ResponseEntity getCommunity(@PathVariable Long communityId) {
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        CommunityRes communityRes = new CommunityRes(community);
        return new ResponseEntity<>(communityRes, HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 수정", notes = "특정 게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "게시글 seq", required = true, dataType = "Long")
    @PutMapping("/{communityId}")
    public ResponseEntity editCommunity(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "게시글 수정", required = true)CommunityPostReq communityPostReq, @PathVariable Long communityId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        if (!community.getUser().equals(user)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        community.setTitle(communityPostReq.getTitle());
        community.setContent(communityPostReq.getContent());
        community.setIsNotice(communityPostReq.getIsNotice());
        community.setUpdateDate(LocalDateTime.now());
        communityRepository.save(community);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 삭제", notes = "게시글 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "게시글 seq", required = true, dataType = "Long")
    @DeleteMapping("/{communityId}")
    public ResponseEntity delete(@ApiIgnore Authentication authentication, @PathVariable Long communityId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        if (!community.getUser().equals(user)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        communityRepository.deleteById(communityId);
        return new ResponseEntity(HttpStatus.OK);
    }


    @ApiOperation(value = "게시판 공지사항 전체 조회", notes = "모든 공지사항을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/notice")
    public ResponseEntity getNoticeList() {
        List<Community> list = communityRepository.findAllByIsNoticeTrue();
        List<CommunityListRes> communityList = new ArrayList<>();

        Collections.reverse(list);

        for (Community entity : list) {
            communityList.add(new CommunityListRes(entity));
        }
        return new ResponseEntity<>(communityList, HttpStatus.OK);
    }

}
