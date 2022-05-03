package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameItemPostRequest")
public class GameItemPostReq {
    @ApiModelProperty(name = "Item name", example = "H01")
    private String item;

    @ApiModelProperty(name = "Item price", example = "100000")
    private Long price;
}
