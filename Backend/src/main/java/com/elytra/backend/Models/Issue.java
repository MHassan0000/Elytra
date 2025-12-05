package com.elytra.backend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "issues")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private IssueStatus status = IssueStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    @JsonIgnore
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zone_id")
    @JsonIgnore
    private Zone zone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id")
    @JsonIgnore
    private Area area;

    @Column(nullable = false)
    private Integer upvotes = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    // Relationships
    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Upvote> upvotesList = new ArrayList<>();

    // Enums
    public enum Priority {
        LOW, MEDIUM, HIGH
    }

    public enum IssueStatus {
        PENDING, IN_PROGRESS, RESOLVED
    }
}
