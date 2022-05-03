package com.ssafy.api.response.game;

import com.ssafy.db.entity.Inventory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameItemListResponse")
public class GameItemListRes {
    @ApiModelProperty(name = "아이템 이름", example = "H01")
    private String item;

    @ApiModelProperty(name = "착용 여부", example = "True")
    private Boolean wear;

    public GameItemListRes(Inventory entity) {
        this.item = entity.getItem();
        this.wear = entity.getWear();
    }
}
