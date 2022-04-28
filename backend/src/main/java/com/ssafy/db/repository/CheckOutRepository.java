package com.ssafy.db.repository;

import com.ssafy.db.entity.CheckOut;
import com.ssafy.db.entity.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckOutRepository extends JpaRepository<CheckOut, Long> {
    Optional<CheckOut> findById(Long id);
    Optional<CheckOut> findByUserId(Long userId);
}
