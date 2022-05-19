package com.ssafy.api.response.check;

import com.ssafy.db.entity.CheckIn;
import com.ssafy.db.entity.CheckOut;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@ApiModel("CheckOutResponse")
public class CheckOutRes {
    @ApiModelProperty(name = "seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "User name", example = "김동유")
    private String username;

    @ApiModelProperty(name = "Checked Time", example = "08:39:45")
    private LocalTime createdTime;

    public CheckOutRes(CheckOut entity) {
        User user = entity.getUser();
        this.id = entity.getId();
        this.username = user.getName();
        this.createdTime = entity.getCreatedTime();
    }
}
