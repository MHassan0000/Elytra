package com.elytra.backend.Services;

import com.elytra.backend.Models.Issue;
import com.elytra.backend.Models.Upvote;
import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.IssueRepository;
import com.elytra.backend.Repository.UpvoteRepository;
import com.elytra.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@SuppressWarnings("null")
public class UpvoteService {

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    public Upvote addUpvote(Long userId, Long issueId) {
        // Check if upvote already exists
        if (upvoteRepository.existsByUserIdAndIssueId(userId, issueId)) {
            throw new RuntimeException("User has already upvoted this issue");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        Upvote upvote = new Upvote();
        upvote.setUser(user);
        upvote.setIssue(issue);

        // Increment upvote count on issue
        issue.setUpvotes(issue.getUpvotes() + 1);
        issueRepository.save(issue);

        return upvoteRepository.save(upvote);
    }

    public void removeUpvote(Long userId, Long issueId) {
        if (!upvoteRepository.existsByUserIdAndIssueId(userId, issueId)) {
            throw new RuntimeException("Upvote not found");
        }

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        // Decrement upvote count on issue
        issue.setUpvotes(Math.max(0, issue.getUpvotes() - 1));
        issueRepository.save(issue);

        upvoteRepository.deleteByUserIdAndIssueId(userId, issueId);
    }

    public boolean hasUserUpvoted(Long userId, Long issueId) {
        return upvoteRepository.existsByUserIdAndIssueId(userId, issueId);
    }

    public Long getUpvoteCount(Long issueId) {
        return upvoteRepository.countByIssueId(issueId);
    }
}
