package com.elytra.backend.Controller;

import com.elytra.backend.Models.Issue;
import com.elytra.backend.Models.User;
import com.elytra.backend.DTO.UserDTO;
import com.elytra.backend.Services.IssueService;
import com.elytra.backend.Services.UserService;
import com.elytra.backend.Services.NotificationService;
import com.elytra.backend.Services.SurveyService;
import com.elytra.backend.Repository.UserRepository;
import com.elytra.backend.Repository.IssueRepository;
import com.elytra.backend.Repository.SurveyResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private IssueService issueService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SurveyService surveyService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private SurveyResponseRepository surveyResponseRepository;

    // Get dashboard statistics
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Total users
        long totalUsers = userRepository.count();
        stats.put("totalUsers", totalUsers);

        // Total reports
        long totalReports = issueRepository.count();
        stats.put("totalReports", totalReports);

        // Pending reports
        long pendingReports = issueRepository.countByStatus(Issue.IssueStatus.PENDING);
        stats.put("pendingReports", pendingReports);

        // Resolved reports
        long resolvedReports = issueRepository.countByStatus(Issue.IssueStatus.RESOLVED);
        stats.put("resolvedReports", resolvedReports);

        // In progress reports
        long inProgressReports = issueRepository.countByStatus(Issue.IssueStatus.IN_PROGRESS);
        stats.put("inProgressReports", inProgressReports);

        return ResponseEntity.ok(stats);
    }

    // Get all users with their issue counts
    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsersWithStats() {
        List<User> users = userService.getAllUsers();

        List<Map<String, Object>> usersWithStats = users.stream()
                .map(user -> {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", user.getId());
                    userMap.put("username", user.getUsername());
                    userMap.put("email", user.getEmail());
                    userMap.put("role", user.getRole().toString());
                    userMap.put("status", user.getStatus().toString());
                    userMap.put("createdAt", user.getCreatedAt());
                    userMap.put("reportCount", issueRepository.countByUserId(user.getId()));
                    return userMap;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(usersWithStats);
    }

    // Get user with their issues
    @GetMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> getUserWithIssues(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        List<Issue> userIssues = issueRepository.findByUserId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().toString());
        response.put("status", user.getStatus().toString());
        response.put("createdAt", user.getCreatedAt());
        response.put("reportCount", userIssues.size());
        response.put("issues", userIssues.stream()
                .map(issue -> issueService.convertToDTO(issue))
                .collect(Collectors.toList()));

        return ResponseEntity.ok(response);
    }

    // Update issue status (admin only)
    @PutMapping("/issues/{id}/status")
    public ResponseEntity<?> updateIssueStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        try {
            String statusStr = request.get("status");
            Issue.IssueStatus newStatus = Issue.IssueStatus.valueOf(statusStr);

            Issue issue = issueRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

            Issue.IssueStatus oldStatus = issue.getStatus();
            issue.setStatus(newStatus);

            // Set resolved timestamp if status is RESOLVED
            if (newStatus == Issue.IssueStatus.RESOLVED && oldStatus != Issue.IssueStatus.RESOLVED) {
                issue.setResolvedAt(java.time.LocalDateTime.now());
            }

            Issue updatedIssue = issueRepository.save(issue);

            // Send notification to issue creator
            notificationService.createIssueStatusNotification(
                    issue.getUser().getId(),
                    issue.getId(),
                    newStatus);

            return ResponseEntity.ok(issueService.convertToDTO(updatedIssue));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Get survey responses for a specific survey
    @GetMapping("/surveys/{surveyId}/responses")
    public ResponseEntity<?> getSurveyResponses(@PathVariable Long surveyId) {
        try {
            List<Map<String, Object>> responses = surveyService.getSurveyResponsesWithUserInfo(surveyId);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Get specific user's survey response
    @GetMapping("/surveys/{surveyId}/responses/{userId}")
    public ResponseEntity<?> getSurveyResponseByUser(
            @PathVariable Long surveyId,
            @PathVariable Long userId) {
        try {
            Map<String, Object> response = surveyService.getSurveyResponseByUser(surveyId, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
