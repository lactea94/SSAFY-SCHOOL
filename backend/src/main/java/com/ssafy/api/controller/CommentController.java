package com.ssafy.api.controller;

import com.ssafy.api.request.comment.CommentPostReq;
import com.ssafy.api.response.comment.CommentListRes;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@AllArgsConstructor
@Api(value = "댓글 API", tags = {"Comment"})
@RequestMapping("/v1/community/{communityId}/comment")
public class CommentController {
    @Autowired
    UserService userService;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    CommentRepository commentRepository;

    @ApiOperation(value = "댓글 작성", notes = "사용자가 게시글에 댓글을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "작성 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping()
    public ResponseEntity postComment(@ApiIgnore Authentication authentication, @PathVariable Long communityId, @RequestBody @ApiParam(value = "댓글 정보", required = true) CommentPostReq commentPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        commentRepository.save(Comment.builder()
                .content(commentPostReq.getContent())
                .createdDate(LocalDateTime.now())
                .user(user)
                .community(community)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 내 전체 댓글 조회", notes = "게시글 내 전체 댓글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "게시글 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "communityId", value = "community seq", required = true)
    @GetMapping()
    public ResponseEntity getCommentList(@PathVariable Long communityId){
        Community community = communityRepository.findById(communityId).orElse(null);
        if (community == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        List<Comment> list = commentRepository.findAllByCommunityId(communityId);
        List<CommentListRes> commentList = new ArrayList<>();

        Collections.reverse(list);

        for (Comment entity : list) {
            commentList.add(new CommentListRes(entity));
        }
        return new ResponseEntity<>(commentList, HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 내 댓글 삭제", notes = "게시글 내 댓글을 삭제한다.")
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
    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@ApiIgnore Authentication authentication, @PathVariable Long communityId, @PathVariable Long commentId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Community community = communityRepository.findById(communityId).orElse(null);
        Comment comment = commentRepository.findById(commentId).orElse(null);

        if (community == null || comment == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        if (!comment.getUser().equals(user)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        commentRepository.deleteById(commentId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
