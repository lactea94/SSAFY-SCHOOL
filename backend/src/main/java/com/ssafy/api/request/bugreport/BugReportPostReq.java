package com.ssafy.api.request.bugreport;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BugReportPosrRequest")
public class BugReportPostReq {
    @ApiModelProperty(name = "content", example = "내용")
    private String content;
}
