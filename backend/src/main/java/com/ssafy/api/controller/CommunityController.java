package com.ssafy.api.controller;

import com.ssafy.api.service.UserService;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "게시판 API", tags = {"Community"})
@AllArgsConstructor
@RestController
@RequestMapping("/v1/community")
public class CommunityController {
    @Autowired
    UserService userService;


}
