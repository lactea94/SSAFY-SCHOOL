package com.ssafy.api.request.gamenotice;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameNoticePostRequest")
public class GameNoticePostReq {
    @ApiModelProperty(name = "GameNotice Title", example = "공지사항 제목")
    private String title;

    @ApiModelProperty(name = "GameNotice Content", example = "공지사항 내용")
    private String content;
}
