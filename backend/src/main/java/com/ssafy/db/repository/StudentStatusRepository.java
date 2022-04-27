package com.ssafy.db.repository;

import com.ssafy.db.entity.StudentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentStatusRepository extends JpaRepository<StudentStatus, Long> {
    Optional<StudentStatus> findById(Long id);
    Optional<StudentStatus> findByUserId(String userId);
}
