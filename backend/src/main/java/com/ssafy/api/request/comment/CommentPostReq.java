package com.ssafy.api.request.comment;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommentPostRequest")
public class CommentPostReq {
    @ApiModelProperty(name = "내용", example = "댓글")
    private String content;
}
