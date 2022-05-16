package com.ssafy.api.controller;

import com.ssafy.api.response.version.VersionRes;
import com.ssafy.db.entity.Version;
import com.ssafy.db.repository.VersionRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Api(value = "버전 API", tags = {"Version"})
@RestController
@RequestMapping("/v1/version")
public class VersionController {
    @Autowired
    VersionRepository versionRepository;

    @ApiOperation(value = "버전 확인", notes = "버전을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("")
    public ResponseEntity getVersion() {
        Version version = versionRepository.findById(1L).orElse(null);
        if (version == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        VersionRes versionRes = new VersionRes(version);
        return new ResponseEntity<>(versionRes, HttpStatus.OK);
    }
}
