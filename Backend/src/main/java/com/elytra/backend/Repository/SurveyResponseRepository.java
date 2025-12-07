package com.elytra.backend.Repository;

import com.elytra.backend.Models.SurveyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long> {
    List<SurveyResponse> findByUserId(Long userId);

    List<SurveyResponse> findBySurveyId(Long surveyId);

    Optional<SurveyResponse> findByUserIdAndSurveyId(Long userId, Long surveyId);

    boolean existsByUserIdAndSurveyId(Long userId, Long surveyId);
}
