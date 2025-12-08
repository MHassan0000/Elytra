package com.elytra.backend.Repository;

import com.elytra.backend.Models.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByUserId(Long userId);

    List<Issue> findByStatus(Issue.IssueStatus status);

    List<Issue> findByCityId(Long cityId);

    List<Issue> findByZoneId(Long zoneId);

    List<Issue> findByAreaId(Long areaId);

    List<Issue> findByCategory(String category);

    @Query("SELECT i FROM Issue i ORDER BY i.createdAt DESC")
    List<Issue> findAllOrderByCreatedAtDesc();

    @Query("SELECT i FROM Issue i ORDER BY i.upvotes DESC, i.createdAt DESC")
    List<Issue> findAllOrderByUpvotesDesc();

    @Query("SELECT i FROM Issue i WHERE i.user.id = ?1 ORDER BY i.createdAt DESC")
    List<Issue> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT COUNT(i) FROM Issue i WHERE i.user.id = ?1")
    Long countByUserId(Long userId);

    @Query("SELECT COUNT(i) FROM Issue i WHERE i.user.id = ?1 AND i.status = ?2")
    Long countByUserIdAndStatus(Long userId, Issue.IssueStatus status);

    @Query("SELECT COUNT(i) FROM Issue i WHERE i.status = ?1")
    Long countByStatus(Issue.IssueStatus status);
}
