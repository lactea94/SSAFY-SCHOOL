package com.ssafy.api.controller;

import com.ssafy.api.request.community.CommunityPostReq;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.Community;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CommentRepository;
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

@Api(value = "관리자 API", tags = {"Admin"})
@RestController
@AllArgsConstructor
@RequestMapping("/v1/admin")
public class AdminController {

    @Autowired
    UserService userService;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    CommentRepository commentRepository;

    @ApiOperation(value = "관리자 게시글 수정", notes = "관리자가 게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "게시글 seq", required = true)
    @PutMapping("/community/{communityId}")
    public ResponseEntity editCommunity(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "게시글 수정", required = true) CommunityPostReq communityPostReq, @PathVariable Long communityId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        if (user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        community.setTitle(communityPostReq.getTitle());
        community.setContent(communityPostReq.getContent());
        community.setIsNotice(communityPostReq.getIsNotice());
        community.setUpdateDate(LocalDateTime.now());
        communityRepository.save(community);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "관리자 게시글 삭제", notes = "관리자가 게시글 삭저한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "게시글 seq", required = true, dataType = "Long")
    @DeleteMapping("/community/{communityId}")
    public ResponseEntity delete(@ApiIgnore Authentication authentication, @PathVariable Long communityId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        if (user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        communityRepository.deleteById(communityId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "관리자 댓글 삭제", notes = "관리자가 게시글 내 댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "게시글, 댓글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "communityId", value = "community seq", required = true, dataType = "Long"),
            @ApiImplicitParam(name = "commentId", value = "comment seq", required = true, dataType = "Long")
    })
    @DeleteMapping("/community/{communityId}/comment/{commentId}")
    public ResponseEntity deleteComment(@ApiIgnore Authentication authentication, @PathVariable Long communityId, @PathVariable Long commentId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Community community = communityRepository.findById(communityId).orElse(null);
        Comment comment = commentRepository.findById(commentId).orElse(null);

        if (community == null || comment == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        if (user.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        commentRepository.deleteById(commentId);
        return new ResponseEntity(HttpStatus.OK);
    }


}
