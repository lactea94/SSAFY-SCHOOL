package com.ssafy.db.repository;

import com.ssafy.db.entity.BugReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BugReportRepository extends JpaRepository<BugReport, Long> {
    Optional<BugReport> findById(Long id);
    List<BugReport> findAll();
}
