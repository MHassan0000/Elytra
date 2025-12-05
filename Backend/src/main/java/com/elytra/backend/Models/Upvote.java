package com.elytra.backend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

@Entity
@Table(name = "upvotes", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "issue_id" })
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Upvote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false)
    @JsonIgnore
    private Issue issue;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
