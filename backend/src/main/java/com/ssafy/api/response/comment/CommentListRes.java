package com.ssafy.api.response.comment;

import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("CommentListResponse")
public class CommentListRes {
    @ApiModelProperty(name = "댓글 seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "댓글 내용", example = "content")
    private String content;

    @ApiModelProperty(name = "댓글 생성 날짜", example = "2022-05-04 15:34:15:000000")
    private LocalDateTime createdDate;

    @ApiModelProperty(name = "사용자 seq", example = "1")
    private Long userId;

    @ApiModelProperty(name = "사용자 이름", example = "김동유")
    private String username;

    @ApiModelProperty(name = "사용자 닉네임", example = "떵유")
    private String nickname;

    public CommentListRes(Comment entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.createdDate = entity.getCreatedDate();
        User user = entity.getUser();
        this.userId = user.getId();
        this.username = user.getName();
        this.nickname = user.getNickname();
    }
}
