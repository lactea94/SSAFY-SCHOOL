package com.ssafy.api.response.user;

import com.ssafy.db.entity.CheckIn;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("CheckInDateListGetResponse")
public class CheckInDateListRes {
    @ApiModelProperty(name = "입실 날짜", example = "2022-04-28")
    private LocalDate checkIndate;

    public CheckInDateListRes(CheckIn entity) {
        this.checkIndate = entity.getCreatedDate();
    }

}
