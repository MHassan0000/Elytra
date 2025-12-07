package com.elytra.backend.DTO;

import com.elytra.backend.Models.Notification;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long id;
    private Long userId;
    private Long issueId;
    private String issueTitle;
    private String message;
    private Notification.NotificationType type;
    private Boolean isRead;
    private LocalDateTime createdAt;

    public static NotificationDTO fromEntity(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setIsRead(notification.getIsRead());
        dto.setCreatedAt(notification.getCreatedAt());

        if (notification.getUser() != null) {
            dto.setUserId(notification.getUser().getId());
        }

        if (notification.getIssue() != null) {
            dto.setIssueId(notification.getIssue().getId());
            dto.setIssueTitle(notification.getIssue().getTitle());
        }

        return dto;
    }
}
