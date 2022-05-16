package com.ssafy.db.repository;

import com.ssafy.db.entity.Version;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VersionRepository extends JpaRepository<Version, Long> {
    Optional<Version> findById(Long id);
}
