package com.ssafy.api.controller;

import com.ssafy.api.request.game.*;
import com.ssafy.api.response.game.GameItemListRes;
import com.ssafy.api.response.game.GameLocationRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Inventory;
import com.ssafy.db.entity.Status;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.InventoryRepository;
import com.ssafy.db.repository.StatusRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("/v1/game")
public class GameController {
    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    UserService userService;

    @Autowired
    StatusRepository statusRepository;

    @ApiOperation(value = "아이템 구매", notes = "사용자가 아이템을 구매한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "아이템 구매"),
            @ApiResponse(code = 400, message = "비용 부적합"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 409, message = "이미 소유중"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PutMapping("/get-item")
    public ResponseEntity getItem(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "새로운 아이템의 정보", required = true)GameItemPostReq gameItemPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Status status = statusRepository.findByUserId(user.getId()).orElse(null);
        Inventory inventory = inventoryRepository.findByItemAndUserId(gameItemPostReq.getItem(), user.getId()).orElse(null);

        if (status.getRemainMileage() < gameItemPostReq.getPrice()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        if (inventory == null) {
            inventoryRepository.save(Inventory.builder()
                    .item(gameItemPostReq.getItem())
                    .wear(false)
                    .user(user)
                    .build());
            status.setRemainMileage(status.getRemainMileage() - gameItemPostReq.getPrice());
            statusRepository.save(status);
            return new ResponseEntity(HttpStatus.CREATED);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @ApiOperation(value = "위치 정보 수정", notes = "로그아웃하며 현재 위치를 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PutMapping("/location")
    public ResponseEntity updateLocation(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "마지막 위치", required = true) GameLocationUpdateReq gameLocationUpdatePostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Long userId = user.getId();
        Status status = statusRepository.findByUserId(userId).orElse(null);
        status.setLocation(gameLocationUpdatePostReq.getLocation());
        statusRepository.save(status);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "마일리지 부여", notes = "사용자에게 마일리지를 부여한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "부여 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name = "userId", value = "사용자 seq", required = true)
    @PutMapping("/earn/{userId}")
    public ResponseEntity giveMileage(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "줄 마일리지 양", required = true)GameMileageUpdateReq gameMileageUpdateReq, @PathVariable Long userId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User admin = userDetails.getUser();
        if (admin.getAdmin() == 2) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        User user = userService.getUserById(userId);
        if (user == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Status status = statusRepository.findByUserId(userId).orElse(null);
        status.setTotalMileage(status.getTotalMileage() + gameMileageUpdateReq.getMileage());
        status.setRemainMileage(status.getRemainMileage() + gameMileageUpdateReq.getMileage());
        statusRepository.save(status);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "초기 인벤토리 정보 조회", notes = "로그인 후 인벤토리 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/initialize-inventory")
    public ResponseEntity initializeInventory(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        List<GameItemListRes> gameItemListResList = new ArrayList<>();
        List<Inventory> inventoryList = inventoryRepository.findAllByUserId(user.getId());

        for (Inventory entity : inventoryList) {
            gameItemListResList.add(new GameItemListRes(entity));
        }

        return new ResponseEntity<>(gameItemListResList, HttpStatus.OK);
    }

    @ApiOperation(value = "초기 위치 정보 조회", notes = "로그인 후 최종 위치 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/initialize-location")
    public ResponseEntity initializeLocation(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Status status = statusRepository.findByUserId(user.getId()).orElse(null);
        GameLocationRes gameLocationRes = new GameLocationRes(status);

        return new ResponseEntity<>(gameLocationRes, HttpStatus.OK);
    }

    @ApiOperation(value = "위치 정보 수정", notes = "로그아웃 전 위치 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PutMapping("/terminate-location")
    public ResponseEntity terminateLocation(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "마지막 위치", required = true) GameLastLocationReq gameLastLocationReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Status status = statusRepository.findByUserId(user.getId()).orElse(null);
        status.setLocation(gameLastLocationReq.getLocation());
        statusRepository.save(status);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value = "인벤토리 정보 수정", notes = "로그아웃 전 인벤토리 정보를 업데이트한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PutMapping("/terminate-inventory")
    public ResponseEntity terminateInventory(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "마지막 인벤토리 상태", required = true) GameLastInventoryListReq gameLastInventoryListReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Long userId = user.getId();

        for( GameLastInventoryReq gameLastInventoryReq : gameLastInventoryListReq.getInventoryList()) {
            Inventory inventory = inventoryRepository.findByItemAndUserId(gameLastInventoryReq.getItem(), userId).orElse(null);
            inventory.setWear(gameLastInventoryReq.getWear());
            inventoryRepository.save(inventory);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
