package com.elytra.backend.Controller;

import com.elytra.backend.Models.Issue;
import com.elytra.backend.DTO.IssueDTO;
import com.elytra.backend.Services.IssueService;
import com.elytra.backend.Services.UpvoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/issues")

public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UpvoteService upvoteService;

    @GetMapping
    public ResponseEntity<List<IssueDTO>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        List<IssueDTO> dtos = issues.stream()
                .map(IssueDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/sorted-by-upvotes")
    public ResponseEntity<List<IssueDTO>> getIssuesSortedByUpvotes() {
        List<Issue> issues = issueService.getIssuesSortedByUpvotes();
        List<IssueDTO> dtos = issues.stream()
                .map(IssueDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id)
                .map(IssueDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<IssueDTO>> getIssuesByUserId(@PathVariable Long userId) {
        List<Issue> issues = issueService.getIssuesByUserId(userId);
        List<IssueDTO> dtos = issues.stream()
                .map(IssueDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<IssueDTO>> getIssuesByStatus(@PathVariable String status) {
        try {
            Issue.IssueStatus issueStatus = Issue.IssueStatus.valueOf(status.toUpperCase());
            List<Issue> issues = issueService.getIssuesByStatus(issueStatus);
            List<IssueDTO> dtos = issues.stream()
                    .map(IssueDTO::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/city/{cityId}")
    public ResponseEntity<List<IssueDTO>> getIssuesByCityId(@PathVariable Long cityId) {
        List<Issue> issues = issueService.getIssuesByCityId(cityId);
        List<IssueDTO> dtos = issues.stream()
                .map(IssueDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<?> createIssue(
            @RequestBody Issue issue,
            @RequestParam Long userId,
            @RequestParam(required = false) Long cityId,
            @RequestParam(required = false) Long zoneId,
            @RequestParam(required = false) Long areaId) {
        try {
            Issue createdIssue = issueService.createIssue(issue, userId, cityId, zoneId, areaId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIssue);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateIssue(@PathVariable Long id, @RequestBody Issue issue) {
        try {
            Issue updatedIssue = issueService.updateIssue(id, issue);
            return ResponseEntity.ok(updatedIssue);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateIssueStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            Issue.IssueStatus issueStatus = Issue.IssueStatus.valueOf(status.toUpperCase());
            Issue updatedIssue = issueService.updateIssueStatus(id, issueStatus);
            return ResponseEntity.ok(updatedIssue);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid status value");
            return ResponseEntity.badRequest().body(error);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIssue(@PathVariable Long id) {
        try {
            issueService.deleteIssue(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Issue deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/user/{userId}/stats")
    public ResponseEntity<Map<String, Long>> getUserIssueStats(@PathVariable Long userId) {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", issueService.countIssuesByUserId(userId));
        stats.put("pending", issueService.countIssuesByUserIdAndStatus(userId, Issue.IssueStatus.PENDING));
        stats.put("inProgress", issueService.countIssuesByUserIdAndStatus(userId, Issue.IssueStatus.IN_PROGRESS));
        stats.put("resolved", issueService.countIssuesByUserIdAndStatus(userId, Issue.IssueStatus.RESOLVED));
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<?> upvoteIssue(@PathVariable Long id, @RequestParam Long userId) {
        try {
            upvoteService.addUpvote(userId, id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Upvote added successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/{id}/downvote")
    public ResponseEntity<?> downvoteIssue(@PathVariable Long id, @RequestParam Long userId) {
        try {
            upvoteService.removeUpvote(userId, id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Downvote processed successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}/vote")
    public ResponseEntity<?> removeVote(@PathVariable Long id, @RequestParam Long userId) {
        try {
            upvoteService.removeUpvote(userId, id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Vote removed successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{id}/user-vote")
    public ResponseEntity<Map<String, Object>> getUserVote(@PathVariable Long id, @RequestParam Long userId) {
        Map<String, Object> response = new HashMap<>();
        boolean hasUpvoted = upvoteService.hasUserUpvoted(userId, id);
        response.put("vote", hasUpvoted ? "up" : null);
        response.put("hasUpvoted", hasUpvoted);
        return ResponseEntity.ok(response);
    }
}
