package com.elytra.backend.DTO;

import com.elytra.backend.Models.Issue;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class IssueDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Issue.Priority priority;
    private Issue.IssueStatus status;
    private Integer upvotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;

    // User info
    private Long userId;
    private String username;

    // Location info
    private Long cityId;
    private String cityName;
    private Long zoneId;
    private String zoneName;
    private Long areaId;
    private String areaName;

    // Vote tracking
    private Boolean hasUserUpvoted;

    public static IssueDTO fromEntity(Issue issue) {
        IssueDTO dto = new IssueDTO();
        dto.setId(issue.getId());
        dto.setTitle(issue.getTitle());
        dto.setDescription(issue.getDescription());
        dto.setCategory(issue.getCategory());
        dto.setPriority(issue.getPriority());
        dto.setStatus(issue.getStatus());
        dto.setUpvotes(issue.getUpvotes());
        dto.setCreatedAt(issue.getCreatedAt());
        dto.setUpdatedAt(issue.getUpdatedAt());
        dto.setResolvedAt(issue.getResolvedAt());

        // Set user info if available
        if (issue.getUser() != null) {
            dto.setUserId(issue.getUser().getId());
            dto.setUsername(issue.getUser().getUsername());
        }

        // Set location info if available
        if (issue.getCity() != null) {
            dto.setCityId(issue.getCity().getId());
            dto.setCityName(issue.getCity().getName());
        }
        if (issue.getZone() != null) {
            dto.setZoneId(issue.getZone().getId());
            dto.setZoneName(issue.getZone().getName());
        }
        if (issue.getArea() != null) {
            dto.setAreaId(issue.getArea().getId());
            dto.setAreaName(issue.getArea().getName());
        }

        return dto;
    }
}
