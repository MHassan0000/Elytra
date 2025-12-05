package com.elytra.backend.Controller;

import com.elytra.backend.Models.Issue;
import com.elytra.backend.Services.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Issue>> getIssuesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(issueService.getIssuesByUserId(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Issue>> getIssuesByStatus(@PathVariable String status) {
        try {
            Issue.IssueStatus issueStatus = Issue.IssueStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(issueService.getIssuesByStatus(issueStatus));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/city/{cityId}")
    public ResponseEntity<List<Issue>> getIssuesByCityId(@PathVariable Long cityId) {
        return ResponseEntity.ok(issueService.getIssuesByCityId(cityId));
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
}
