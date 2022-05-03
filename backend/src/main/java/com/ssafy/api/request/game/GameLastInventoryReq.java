package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameLastInventoryRequest")
public class GameLastInventoryReq {
    @ApiModelProperty(name = "아이템 이름", example = "HJ01")
    private String item;

    @ApiModelProperty(name = "착용 여부", example = "True")
    private Boolean wear;
}
