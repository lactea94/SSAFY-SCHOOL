package com.ssafy.api.controller;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("/v1/game")
public class GameController {

}
