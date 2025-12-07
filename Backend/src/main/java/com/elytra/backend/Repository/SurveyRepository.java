package com.elytra.backend.Repository;

import com.elytra.backend.Models.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
    List<Survey> findByIsActiveTrue();

    List<Survey> findAllByOrderByCreatedAtDesc();
}
