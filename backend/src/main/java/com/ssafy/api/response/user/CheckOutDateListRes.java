package com.ssafy.api.response.user;

import com.ssafy.db.entity.CheckOut;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("CheckOutDateListGetResponse")
public class CheckOutDateListRes {
    @ApiModelProperty(name = "퇴실 날짜", example = "2022-04-28")
    private LocalDate checkOutDate;

    public CheckOutDateListRes(CheckOut entity) {
        this.checkOutDate = entity.getCreatedDate();
    }
}
