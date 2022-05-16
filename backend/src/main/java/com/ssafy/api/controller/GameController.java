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
import java.util.HashMap;
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
    @PutMapping("/item")
    public ResponseEntity getItem(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "새로운 아이템의 정보", required = true)GameItemPostReq gameItemPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Status status = statusRepository.findByUserId(user.getId()).orElse(null);
        HashMap<String, Long> priceMap = new HashMap<>();
        priceMap.put("Accessory_00", 10000L);
        priceMap.put("Accessory_01", 12000L);
        priceMap.put("Accessory_02", 10000L);
        priceMap.put("Costume_01", 20000L);
        priceMap.put("Costume_02", 15000L);
        priceMap.put("Costume_05", 15000L);
        priceMap.put("Costume_06", 20000L);

        String itemName = gameItemPostReq.getItem();
        String[] info = itemName.split("\\$");
        List<Inventory> inventoryList = inventoryRepository.findAllByUserIdAndWearTrue(user.getId());
        if (inventoryList.isEmpty()) {
            inventoryRepository.save(Inventory.builder()
                    .item(gameItemPostReq.getItem())
                    .wear(false)
                    .user(user)
                    .build());
            return new ResponseEntity(HttpStatus.CREATED);
        }
        if (info[1].equals("Accessory") || info[1].equals("Costume")) {
            Inventory inventory = inventoryRepository.findByItemAndUserId(gameItemPostReq.getItem(), user.getId()).orElse(null);
            if (inventory == null) {
                if (!priceMap.containsKey(info[2])) {
                    return new ResponseEntity(HttpStatus.BAD_REQUEST);
                }

                Long price = priceMap.get(info[2]);
                if (status.getRemainMileage() < price) {
                    return new ResponseEntity(HttpStatus.BAD_REQUEST);
                }
                inventoryRepository.save(Inventory.builder()
                        .item(gameItemPostReq.getItem())
                        .wear(false)
                        .user(user)
                        .build());
                status.setRemainMileage(status.getRemainMileage() - price);
                statusRepository.save(status);
                return new ResponseEntity(HttpStatus.CREATED);
            } else {
                return new ResponseEntity(HttpStatus.CONFLICT);
            }
        } else if (info[1].equals("Hair") || info[1].equals("Face")) {
            for (Inventory item : inventoryList) {
                String[] information = item.getItem().split("\\$");
                if (item.getItem().equals(itemName)) {
                    return new ResponseEntity(HttpStatus.CONFLICT);
                }
                if (information[1].equals(info[1])) {
                    Long price = 0L;
                    if (!info[2].equals(information[2])) {
                        price += 15000L;
                    }
                    if (!info[3].equals(information[3])) {
                        price += 5000L;
                    }
                    if (status.getRemainMileage() < price) {
                        return new ResponseEntity(HttpStatus.BAD_REQUEST);
                    }
                    status.setRemainMileage(status.getRemainMileage() - price);
                    item.setItem(gameItemPostReq.getItem());
                    item.setWear(true);
                    inventoryRepository.save(item);
                    break;
                } else if (information[1].equals(info[1])) {
                    if (status.getRemainMileage() < 20000L) {
                        return new ResponseEntity(HttpStatus.BAD_REQUEST);
                    }
                    status.setRemainMileage(status.getRemainMileage() - 20000L);
                    item.setItem(gameItemPostReq.getItem());
                    item.setWear(true);
                    inventoryRepository.save(item);
                    break;
                }
            }
        }
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
    @GetMapping("/inventory")
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
    @GetMapping("/location")
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
    @PutMapping("/location")
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
            @ApiResponse(code = 404, message = "아이템 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PutMapping("/inventory")
    public ResponseEntity terminateInventory(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "마지막 인벤토리 상태", required = true) GameLastInventoryListReq gameLastInventoryListReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        Long userId = user.getId();

        for( GameLastInventoryReq gameLastInventoryReq : gameLastInventoryListReq.getInventoryList()) {
            Inventory inventory = inventoryRepository.findByItemAndUserId(gameLastInventoryReq.getItem(), userId).orElse(null);
            if (inventory == null) {
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            }
        }

        for( GameLastInventoryReq gameLastInventoryReq : gameLastInventoryListReq.getInventoryList()) {
            Inventory inventory = inventoryRepository.findByItemAndUserId(gameLastInventoryReq.getItem(), userId).orElse(null);
            inventory.setWear(gameLastInventoryReq.getWear());
            inventoryRepository.save(inventory);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
