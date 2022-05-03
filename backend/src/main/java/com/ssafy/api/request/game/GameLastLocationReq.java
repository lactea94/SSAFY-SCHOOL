package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameLastLocationRequest")
public class GameLastLocationReq {
    @ApiModelProperty(name = "마지막 위치", example = "(0,10,1)")
    private String location;
}
