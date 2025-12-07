package com.elytra.backend.Controller;

import com.elytra.backend.Models.Survey;
import com.elytra.backend.Models.SurveyResponse;
import com.elytra.backend.DTO.SurveyDTO;
import com.elytra.backend.DTO.SurveyResponseRequest;
import com.elytra.backend.Services.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/surveys")

public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @GetMapping
    public ResponseEntity<List<SurveyDTO>> getAllSurveys() {
        List<Survey> surveys = surveyService.getAllSurveys();
        List<SurveyDTO> dtos = surveys.stream()
                .map(SurveyDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/active")
    public ResponseEntity<List<SurveyDTO>> getActiveSurveys() {
        List<Survey> surveys = surveyService.getActiveSurveys();
        List<SurveyDTO> dtos = surveys.stream()
                .map(SurveyDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SurveyDTO> getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id)
                .map(SurveyDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createSurvey(@RequestBody Survey survey) {
        try {
            Survey createdSurvey = surveyService.createSurvey(survey);
            return ResponseEntity.status(HttpStatus.CREATED).body(SurveyDTO.fromEntity(createdSurvey));
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSurvey(@PathVariable Long id, @RequestBody Survey survey) {
        try {
            Survey updatedSurvey = surveyService.updateSurvey(id, survey);
            return ResponseEntity.ok(SurveyDTO.fromEntity(updatedSurvey));
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSurvey(@PathVariable Long id) {
        try {
            surveyService.deleteSurvey(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Survey deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/{id}/responses")
    public ResponseEntity<?> submitSurveyResponse(
            @PathVariable Long id,
            @RequestBody SurveyResponseRequest request) {
        try {
            SurveyResponse response = surveyService.submitSurveyResponse(
                    id,
                    request.getUserId(),
                    request.getResponses());
            Map<String, Object> result = new HashMap<>();
            result.put("message", "Survey response submitted successfully");
            result.put("responseId", response.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/user/{userId}/responses")
    public ResponseEntity<List<SurveyResponse>> getUserSurveyResponses(@PathVariable Long userId) {
        List<SurveyResponse> responses = surveyService.getUserSurveyResponses(userId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}/responses")
    public ResponseEntity<List<SurveyResponse>> getSurveyResponses(@PathVariable Long id) {
        List<SurveyResponse> responses = surveyService.getSurveyResponses(id);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{surveyId}/check/{userId}")
    public ResponseEntity<Map<String, Boolean>> checkUserSubmission(
            @PathVariable Long surveyId,
            @PathVariable Long userId) {
        Map<String, Boolean> result = new HashMap<>();
        result.put("hasSubmitted", surveyService.hasUserSubmittedSurvey(userId, surveyId));
        return ResponseEntity.ok(result);
    }
}
