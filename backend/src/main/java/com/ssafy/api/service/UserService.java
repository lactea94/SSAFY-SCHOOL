package com.ssafy.api.service;

import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.db.entity.*;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	Status getStatusByUserId(Long userId);
	StudentStatus getStudentStatusByUserId(Long userId);
	CheckOut getCheckOutByUserId(Long userId);
	CheckIn getCheckInByUserId(Long userId);
}
