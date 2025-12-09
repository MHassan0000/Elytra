package com.elytra.backend.Services;

import com.elytra.backend.Models.Issue;
import com.elytra.backend.Models.Notification;
import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.IssueRepository;
import com.elytra.backend.Repository.NotificationRepository;
import com.elytra.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@SuppressWarnings("null")
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }

    public Long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public Notification createNotification(Long userId, Long issueId, String message,
            Notification.NotificationType type) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setType(type);

        if (issueId != null) {
            Issue issue = issueRepository.findById(issueId)
                    .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));
            notification.setIssue(issue);
        }

        return notificationRepository.save(notification);
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));

        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }

    public void deleteNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + notificationId));
        notificationRepository.delete(notification);
    }

    public void createIssueStatusNotification(Long userId, Long issueId, Issue.IssueStatus newStatus) {
        String message;
        Notification.NotificationType type;

        switch (newStatus) {
            case IN_PROGRESS:
                message = "Your issue is now being addressed by our team.";
                type = Notification.NotificationType.ISSUE_IN_PROGRESS;
                break;
            case RESOLVED:
                message = "Your issue has been resolved. Thank you for your report!";
                type = Notification.NotificationType.ISSUE_RESOLVED;
                break;
            default:
                message = "Your issue status has been updated.";
                type = Notification.NotificationType.ISSUE_UPDATE;
                break;
        }

        createNotification(userId, issueId, message, type);
    }
}
