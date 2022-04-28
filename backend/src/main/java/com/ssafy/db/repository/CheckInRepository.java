package com.ssafy.db.repository;

import com.ssafy.db.entity.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, Long> {
    Optional<CheckIn> findById(Long id);
    List<CheckIn> findAllByUserId(Long userId);
}
