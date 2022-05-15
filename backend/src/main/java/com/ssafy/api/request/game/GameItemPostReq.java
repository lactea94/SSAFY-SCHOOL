package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameItemPostRequest")
public class GameItemPostReq {
    @ApiModelProperty(name = "Item name", example = "Male$Hair$Hair_00$_00")
    private String item;
}
