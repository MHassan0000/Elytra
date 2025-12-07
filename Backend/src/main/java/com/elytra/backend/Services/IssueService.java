package com.elytra.backend.Services;

import com.elytra.backend.Models.*;
import com.elytra.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("null")
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private NotificationService notificationService;

    public List<Issue> getAllIssues() {
        return issueRepository.findAllOrderByCreatedAtDesc();
    }

    public List<Issue> getIssuesSortedByUpvotes() {
        return issueRepository.findAllOrderByUpvotesDesc();
    }

    public Optional<Issue> getIssueById(Long id) {
        return issueRepository.findById(id);
    }

    public List<Issue> getIssuesByUserId(Long userId) {
        return issueRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Issue> getIssuesByStatus(Issue.IssueStatus status) {
        return issueRepository.findByStatus(status);
    }

    public List<Issue> getIssuesByCityId(Long cityId) {
        return issueRepository.findByCityId(cityId);
    }

    public Issue createIssue(Issue issue, Long userId, Long cityId, Long zoneId, Long areaId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        issue.setUser(user);

        if (cityId != null) {
            City city = cityRepository.findById(cityId)
                    .orElseThrow(() -> new RuntimeException("City not found with id: " + cityId));
            issue.setCity(city);
        }

        if (zoneId != null) {
            Zone zone = zoneRepository.findById(zoneId)
                    .orElseThrow(() -> new RuntimeException("Zone not found with id: " + zoneId));
            issue.setZone(zone);
        }

        if (areaId != null) {
            Area area = areaRepository.findById(areaId)
                    .orElseThrow(() -> new RuntimeException("Area not found with id: " + areaId));
            issue.setArea(area);
        }

        return issueRepository.save(issue);
    }

    public Issue updateIssue(Long id, Issue issueDetails) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        issue.setTitle(issueDetails.getTitle());
        issue.setDescription(issueDetails.getDescription());
        issue.setCategory(issueDetails.getCategory());
        issue.setPriority(issueDetails.getPriority());
        issue.setStatus(issueDetails.getStatus());

        // Set resolved timestamp when status changes to RESOLVED
        if (issueDetails.getStatus() == Issue.IssueStatus.RESOLVED && issue.getResolvedAt() == null) {
            issue.setResolvedAt(LocalDateTime.now());
        }

        return issueRepository.save(issue);
    }

    public Issue updateIssueStatus(Long id, Issue.IssueStatus status) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        Issue.IssueStatus oldStatus = issue.getStatus();
        issue.setStatus(status);

        if (status == Issue.IssueStatus.RESOLVED && issue.getResolvedAt() == null) {
            issue.setResolvedAt(LocalDateTime.now());
        }

        Issue savedIssue = issueRepository.save(issue);

        // Create notification if status changed
        if (oldStatus != status && issue.getUser() != null) {
            notificationService.createIssueStatusNotification(
                    issue.getUser().getId(),
                    issue.getId(),
                    status);
        }

        return savedIssue;
    }

    public void deleteIssue(Long id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));
        issueRepository.delete(issue);
    }

    public Long countIssuesByUserId(Long userId) {
        return issueRepository.countByUserId(userId);
    }

    public Long countIssuesByUserIdAndStatus(Long userId, Issue.IssueStatus status) {
        return issueRepository.countByUserIdAndStatus(userId, status);
    }
}
