package com.elytra.backend.Controller;

import com.elytra.backend.Services.UpvoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/upvotes")

public class UpvoteController {

    @Autowired
    private UpvoteService upvoteService;

    @PostMapping
    public ResponseEntity<?> addUpvote(@RequestParam Long userId, @RequestParam Long issueId) {
        try {
            upvoteService.addUpvote(userId, issueId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Upvote added successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeUpvote(@RequestParam Long userId, @RequestParam Long issueId) {
        try {
            upvoteService.removeUpvote(userId, issueId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Upvote removed successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkUpvote(@RequestParam Long userId, @RequestParam Long issueId) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("hasUpvoted", upvoteService.hasUserUpvoted(userId, issueId));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count/{issueId}")
    public ResponseEntity<Map<String, Long>> getUpvoteCount(@PathVariable Long issueId) {
        Map<String, Long> response = new HashMap<>();
        response.put("count", upvoteService.getUpvoteCount(issueId));
        return ResponseEntity.ok(response);
    }
}
