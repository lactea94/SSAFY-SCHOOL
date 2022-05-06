package com.ssafy.api.response.bugreport;

import com.ssafy.db.entity.BugReport;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("BugReportListResponse")
public class BugReportListRes {

    @ApiModelProperty(name = "seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "content", example = "내용")
    private String content;

    @ApiModelProperty(name = "생성날짜", example = "2022-05-06 15:22:15:000000")
    private LocalDateTime createdDate;

    @ApiModelProperty(name = "작성자 seq", example = "11")
    private Long userId;

    @ApiModelProperty(name = "작성자 이름", example = "김동유")
    private String username;

    @ApiModelProperty(name = "작성자 닉네임", example = "떵유")
    private String nickname;

    public BugReportListRes(BugReport entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.createdDate = entity.getCreatedDate();
        User user = entity.getUser();
        this.userId = user.getId();
        this.username = user.getName();
        this.nickname = user.getNickname();
    }
}
