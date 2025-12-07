package com.elytra.backend.DTO;

import lombok.Data;

@Data
public class SurveyResponseRequest {
    private Long surveyId;
    private Long userId;
    private String responses; // JSON string containing user's answers
}
