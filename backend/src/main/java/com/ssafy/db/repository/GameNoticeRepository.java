package com.ssafy.db.repository;

import com.ssafy.db.entity.GameNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameNoticeRepository extends JpaRepository<GameNotice, Long> {
    Optional<GameNotice> findById(Long id);

    List<GameNotice> findAll();
}
