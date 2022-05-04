package com.ssafy.api.request.game;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@ApiModel("GameLastInventoryListRequest")
public class GameLastInventoryListReq {
    @ApiModelProperty(name = "마지막 인벤토리 정보", example = "[{\"item\": \"HO01\", \"wear\" : \"True\"}]")
    private List<GameLastInventoryReq> inventoryList;
}
