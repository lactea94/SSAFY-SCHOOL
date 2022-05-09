package com.ssafy.api.service;

import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.user.UserRegisterPostReq;

import java.util.Optional;

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
		Status status = new Status();
		status.setUser(user);
		status.setLocation("(0.0,0.0,-260)");
		status.setRemainMileage(0L);
		status.setTotalMileage(0L);
		statusRepository.save(status);
		StudentStatus studentStatus = new StudentStatus();
		studentStatus.setStudentId("0610000");
		studentStatus.setClassNumber("0");
		studentStatus.setTeamCode("C000");
		studentStatus.setLocal("Gwangju");
		studentStatus.setUser(user);
		studentStatusRepository.save(studentStatus);
		return userRepository.save(user);
	}

	@Override
	public User getUserById(Long Id) {
		User user = userRepository.findById(Id).orElse(null);
		return user;
	}


	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public Status getStatusByUserId(Long userId) {
		Status status = statusRepository.findByUserId(userId).orElse(null);
		return status;
	}

	@Override
	public StudentStatus getStudentStatusByUserId(Long userId) {
		StudentStatus studentStatus = studentStatusRepository.findByUserId(userId).orElse(null);
		return studentStatus;
	}

}
