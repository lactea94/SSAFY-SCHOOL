package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameMileageUpdateRequest")
public class GameMileageUpdateReq {
    @ApiModelProperty(name = "부여될 마일리지", example = "20000")
    private Long mileage;
}
