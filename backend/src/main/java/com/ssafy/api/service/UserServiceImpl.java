package com.ssafy.api.service;

import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.user.UserRegisterPostReq;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	StatusRepository statusRepository;

	@Autowired
	StudentStatusRepository studentStatusRepository;

	@Autowired
	CheckOutRepository checkOutRepository;

	@Autowired
	CheckInRepository checkInRepository;

	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserId(userRegisterInfo.getId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setNickname(userRegisterInfo.getNickname());
		user.setName(userRegisterInfo.getName());
		user.setGender(userRegisterInfo.getGender());
		user.setEmail(userRegisterInfo.getEmail());
		user.setAdmin(2L);
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public Status getStatusByUserId(String userId) {
		Status status = statusRepository.findByUserId(userId).get();
		return status;
	}

	@Override
	public StudentStatus getStudentStatusByUserId(String userId) {
		StudentStatus studentStatus = studentStatusRepository.findByUserId(userId).get();
		return studentStatus;
	}

	@Override
	public CheckOut getCheckOutByUserId(String userId) {
		CheckOut checkOut = checkOutRepository.findByUserId(userId).get();
		return checkOut;
	}

	@Override
	public CheckIn getCheckInByUserId(String userId) {
		CheckIn checkIn = checkInRepository.findByUserId(userId).get();
		return checkIn;
	}
}
