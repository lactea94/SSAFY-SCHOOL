package com.ssafy.api.response.version;

import com.ssafy.db.entity.Version;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("VersionResponse")
public class VersionRes {
    @ApiModelProperty(name = "Version Info", example = "1.0.0")
    String version;

    public VersionRes(Version entity) {
        this.version = entity.getVersion();
    }
}
