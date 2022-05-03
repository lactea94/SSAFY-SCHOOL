package com.ssafy.db.repository;

import com.ssafy.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findById(Long id);

    List<Community> findAllByIsNoticeTrue();

    List<Community> findAllByIsNoticeFalse();

    @Query(value = "select * from community", nativeQuery = true)
    List<Object[]> findCommunityList();
}
