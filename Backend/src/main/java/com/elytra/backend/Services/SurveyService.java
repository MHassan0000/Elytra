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
}
