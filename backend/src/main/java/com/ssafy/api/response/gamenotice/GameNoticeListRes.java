package com.ssafy.api.response.gamenotice;

import com.ssafy.db.entity.GameNotice;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("GameNoticeListResponse")
public class GameNoticeListRes {
    @ApiModelProperty(name = "GameNotice seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "GameNotice Title", example = "제목")
    private String title;

    @ApiModelProperty(name = "GameNotice Content", example = "내용")
    private String content;

    @ApiModelProperty(name = "GameNotice UpdatedDate", example = "2022-05-04 17:51:15:000000")
    private LocalDateTime updatedDate;

    @ApiModelProperty(name = "User seq", example = "1")
    private Long userId;

    @ApiModelProperty(name = "User Name", example = "김동유")
    private String username;

    @ApiModelProperty(name = "User Nickname", example = "떵유")
    private String nickname;

    public GameNoticeListRes(GameNotice entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.updatedDate = entity.getUpdatedDate();
        User user = entity.getUser();
        this.userId = user.getId();
        this.username = user.getName();
        this.nickname = user.getNickname();
    }
}
