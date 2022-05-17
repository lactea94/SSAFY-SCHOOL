package com.ssafy.db.repository;

import com.ssafy.db.entity.CheckOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CheckOutRepository extends JpaRepository<CheckOut, Long> {
    Optional<CheckOut> findById(Long id);
    Optional<CheckOut> findByCreatedDateAndUserId(LocalDate createdDate, Long userId);
    List<CheckOut> findAllByUserId(Long userId);

    @Query(value = "select * from check_out", nativeQuery = true)
    List<CheckOut> findCheckOutList();
}
