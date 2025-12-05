package com.elytra.backend.Repository;

import com.elytra.backend.Models.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote, Long> {

    Optional<Upvote> findByUserIdAndIssueId(Long userId, Long issueId);

    boolean existsByUserIdAndIssueId(Long userId, Long issueId);

    Long countByIssueId(Long issueId);

    void deleteByUserIdAndIssueId(Long userId, Long issueId);
}
