package com.elytra.backend.Services;

import com.elytra.backend.Models.Survey;
import com.elytra.backend.Models.SurveyResponse;
import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.SurveyRepository;
import com.elytra.backend.Repository.SurveyResponseRepository;
import com.elytra.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("null")
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private SurveyResponseRepository surveyResponseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Survey> getAllSurveys() {
        return surveyRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Survey> getActiveSurveys() {
        return surveyRepository.findByIsActiveTrue();
    }

    public Optional<Survey> getSurveyById(Long id) {
        return surveyRepository.findById(id);
    }

    public Survey createSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    public Survey updateSurvey(Long id, Survey surveyDetails) {
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Survey not found with id: " + id));

        survey.setTitle(surveyDetails.getTitle());
        survey.setDescription(surveyDetails.getDescription());
        survey.setQuestions(surveyDetails.getQuestions());
        survey.setIsActive(surveyDetails.getIsActive());

        return surveyRepository.save(survey);
    }

    public void deleteSurvey(Long id) {
        Survey survey = surveyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Survey not found with id: " + id));
        surveyRepository.delete(survey);
    }

    public SurveyResponse submitSurveyResponse(Long surveyId, Long userId, String responses) {
        // Check if user already submitted this survey
        if (surveyResponseRepository.existsByUserIdAndSurveyId(userId, surveyId)) {
            throw new RuntimeException("You have already submitted this survey");
        }

        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Survey not found with id: " + surveyId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (!survey.getIsActive()) {
            throw new RuntimeException("This survey is no longer active");
        }

        SurveyResponse surveyResponse = new SurveyResponse();
        surveyResponse.setSurvey(survey);
        surveyResponse.setUser(user);
        surveyResponse.setResponses(responses);

        return surveyResponseRepository.save(surveyResponse);
    }

    public List<SurveyResponse> getUserSurveyResponses(Long userId) {
        return surveyResponseRepository.findByUserId(userId);
    }

    public List<SurveyResponse> getSurveyResponses(Long surveyId) {
        return surveyResponseRepository.findBySurveyId(surveyId);
    }

    public boolean hasUserSubmittedSurvey(Long userId, Long surveyId) {
        return surveyResponseRepository.existsByUserIdAndSurveyId(userId, surveyId);
    }

    // Admin methods
    public List<java.util.Map<String, Object>> getSurveyResponsesWithUserInfo(Long surveyId) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Survey not found with id: " + surveyId));

        List<SurveyResponse> responses = surveyResponseRepository.findBySurveyId(surveyId);

        return responses.stream()
                .map(response -> {
                    java.util.Map<String, Object> map = new java.util.HashMap<>();
                    map.put("id", response.getId());
                    map.put("userId", response.getUser().getId());
                    map.put("username", response.getUser().getUsername());
                    map.put("email", response.getUser().getEmail());
                    map.put("submittedAt", response.getSubmittedAt());
                    return map;
                })
                .collect(java.util.stream.Collectors.toList());
    }

    public java.util.Map<String, Object> getSurveyResponseByUser(Long surveyId, Long userId) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new RuntimeException("Survey not found with id: " + surveyId));

        SurveyResponse response = surveyResponseRepository.findByUserIdAndSurveyId(userId, surveyId)
                .orElseThrow(() -> new RuntimeException("Survey response not found"));

        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("id", response.getId());
        map.put("surveyId", survey.getId());
        map.put("surveyTitle", survey.getTitle());
        map.put("surveyDescription", survey.getDescription());
        map.put("questions", survey.getQuestions());
        map.put("userId", response.getUser().getId());
        map.put("username", response.getUser().getUsername());
        map.put("email", response.getUser().getEmail());
        map.put("responses", response.getResponses());
        map.put("submittedAt", response.getSubmittedAt());

        return map;
    }

    // Admin method to create survey
    public Survey createSurveyAsAdmin(java.util.Map<String, Object> surveyData) {
        Survey survey = new Survey();

        // Set basic fields
        survey.setTitle((String) surveyData.get("title"));
        survey.setDescription((String) surveyData.get("description"));

        // Set questions as JSON string
        Object questionsObj = surveyData.get("questions");
        if (questionsObj != null) {
            // If it's already a string, use it directly
            if (questionsObj instanceof String) {
                survey.setQuestions((String) questionsObj);
            } else {
                // Otherwise, convert to JSON string
                try {
                    com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                    survey.setQuestions(mapper.writeValueAsString(questionsObj));
                } catch (Exception e) {
                    throw new RuntimeException("Failed to serialize questions: " + e.getMessage());
                }
            }
        }

        // Set active status (default to true if not specified)
        Boolean isActive = (Boolean) surveyData.get("isActive");
        survey.setIsActive(isActive != null ? isActive : true);

        // Save and return
        return surveyRepository.save(survey);
    }
}
