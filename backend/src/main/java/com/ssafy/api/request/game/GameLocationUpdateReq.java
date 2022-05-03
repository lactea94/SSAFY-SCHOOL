package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameLocationUpdatePostRequest")
public class GameLocationUpdateReq {
    @ApiModelProperty(name = "위치 정보", example = "(0,1,0)")
    private String location;
}
