package com.elytra.backend;

import com.elytra.backend.Models.Survey;
import com.elytra.backend.Repository.SurveyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initSurveys(SurveyRepository surveyRepository) {
        return args -> {
            // Check if surveys already exist
            if (surveyRepository.count() > 0) {
                System.out.println("Surveys already initialized");
                return;
            }

            // Create sample surveys
            Survey survey1 = new Survey();
            survey1.setTitle("Community Safety Survey");
            survey1.setDescription("Help us understand your safety concerns and improve community security");
            survey1.setQuestions(
                    "[{\"id\":\"q1\",\"question\":\"How safe do you feel in your neighborhood?\",\"type\":\"rating\",\"required\":true},{\"id\":\"q2\",\"question\":\"What are your main safety concerns?\",\"type\":\"checkbox\",\"options\":[\"Poor lighting\",\"Crime\",\"Traffic\",\"Lack of police presence\",\"Other\"],\"required\":true},{\"id\":\"q3\",\"question\":\"Any additional comments or suggestions?\",\"type\":\"text\",\"required\":false}]");
            survey1.setIsActive(true);

            Survey survey2 = new Survey();
            survey2.setTitle("Infrastructure Improvement Survey");
            survey2.setDescription("Share your thoughts on local infrastructure and what needs improvement");
            survey2.setQuestions(
                    "[{\"id\":\"q1\",\"question\":\"Rate the condition of roads in your area\",\"type\":\"rating\",\"required\":true},{\"id\":\"q2\",\"question\":\"Which infrastructure areas need the most attention?\",\"type\":\"checkbox\",\"options\":[\"Roads and pavements\",\"Street lighting\",\"Drainage systems\",\"Public transportation\",\"Parks and recreation\"],\"required\":true},{\"id\":\"q3\",\"question\":\"How often do you use public transportation?\",\"type\":\"radio\",\"options\":[\"Daily\",\"Weekly\",\"Monthly\",\"Rarely\",\"Never\"],\"required\":true},{\"id\":\"q4\",\"question\":\"Additional suggestions for infrastructure improvements\",\"type\":\"text\",\"required\":false}]");
            survey2.setIsActive(true);

            Survey survey3 = new Survey();
            survey3.setTitle("Community Services Feedback");
            survey3.setDescription("Tell us how we can improve community services and facilities");
            survey3.setQuestions(
                    "[{\"id\":\"q1\",\"question\":\"How satisfied are you with current community services?\",\"type\":\"rating\",\"required\":true},{\"id\":\"q2\",\"question\":\"Which services would you like to see improved?\",\"type\":\"checkbox\",\"options\":[\"Waste management\",\"Healthcare facilities\",\"Educational institutions\",\"Recreational facilities\",\"Emergency services\"],\"required\":true},{\"id\":\"q3\",\"question\":\"What new services would benefit the community?\",\"type\":\"text\",\"required\":false}]");
            survey3.setIsActive(true);

            surveyRepository.save(survey1);
            surveyRepository.save(survey2);
            surveyRepository.save(survey3);

            System.out.println("Sample surveys initialized successfully!");
        };
    }
}
