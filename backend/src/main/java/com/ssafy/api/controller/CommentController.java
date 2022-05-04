package com.ssafy.api.controller;

import com.ssafy.api.service.UserService;
import com.ssafy.db.repository.CommentRepository;
import com.ssafy.db.repository.CommunityRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

//    @ApiOperation(value = "댓글 작성", notes = "사용자가 게시글에 댓글을 작성한다.")
//    @ApiResponses({
//
//    })
}
