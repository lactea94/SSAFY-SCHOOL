package com.ssafy.db.repository;

import com.ssafy.db.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    Optional<Status> findById(Long id);
    Optional<Status> findByUserId(Long userId);
}
