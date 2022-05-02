package com.ssafy.api.response.game;

import com.ssafy.db.entity.Status;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameLocationResponse")
public class GameLocationRes {
    @ApiModelProperty(name = "초기 위치정보", example = "(0,1,0)")
    private String location;

    public GameLocationRes(Status entity) {
        this.location = entity.getLocation();
    }
}
