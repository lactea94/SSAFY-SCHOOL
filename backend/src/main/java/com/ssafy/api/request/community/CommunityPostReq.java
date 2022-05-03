package com.ssafy.api.request.community;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommunituPostRequest")
public class CommunityPostReq {
    @ApiModelProperty(name = "제목", example = "제목입니다.")
    private String title;

    @ApiModelProperty(name = "내용", example = "내용입니다.")
    private String content;

    @ApiModelProperty(name = "공지 여부", example = "True")
    private Boolean isNotice;
}
