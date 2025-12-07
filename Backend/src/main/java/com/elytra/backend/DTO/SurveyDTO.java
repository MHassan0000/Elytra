package com.elytra.backend.DTO;

import com.elytra.backend.Models.Survey;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SurveyDTO {
    private Long id;
    private String title;
    private String description;
    private String questions; // JSON string
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer responseCount;

    public static SurveyDTO fromEntity(Survey survey) {
        SurveyDTO dto = new SurveyDTO();
        dto.setId(survey.getId());
        dto.setTitle(survey.getTitle());
        dto.setDescription(survey.getDescription());
        dto.setQuestions(survey.getQuestions());
        dto.setIsActive(survey.getIsActive());
        dto.setCreatedAt(survey.getCreatedAt());
        dto.setUpdatedAt(survey.getUpdatedAt());
        dto.setResponseCount(survey.getResponses() != null ? survey.getResponses().size() : 0);
        return dto;
    }
}
