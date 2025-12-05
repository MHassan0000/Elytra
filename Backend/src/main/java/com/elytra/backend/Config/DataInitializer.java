package com.elytra.backend.Config;

import com.elytra.backend.Models.*;
import com.elytra.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (userRepository.count() > 0) {
            System.out.println("Database already initialized. Skipping data initialization.");
            return;
        }

        System.out.println("Initializing sample data...");

        // Create sample users
        User user1 = new User();
        user1.setUsername("hassan");
        user1.setEmail("hassan@example.com");
        user1.setPasswordHash("$2a$10$dummyhash1"); // Dummy hash for now
        user1.setRole(User.Role.USER);
        user1.setStatus(User.Status.ACTIVE);
        userRepository.save(user1);

        User user2 = new User();
        user2.setUsername("ahmed_khan");
        user2.setEmail("ahmed@example.com");
        user2.setPasswordHash("$2a$10$dummyhash2");
        user2.setRole(User.Role.USER);
        user2.setStatus(User.Status.ACTIVE);
        userRepository.save(user2);

        User user3 = new User();
        user3.setUsername("sara_ali");
        user3.setEmail("sara@example.com");
        user3.setPasswordHash("$2a$10$dummyhash3");
        user3.setRole(User.Role.USER);
        user3.setStatus(User.Status.ACTIVE);
        userRepository.save(user3);

        User user4 = new User();
        user4.setUsername("usman_malik");
        user4.setEmail("usman@example.com");
        user4.setPasswordHash("$2a$10$dummyhash4");
        user4.setRole(User.Role.USER);
        user4.setStatus(User.Status.ACTIVE);
        userRepository.save(user4);

        User user5 = new User();
        user5.setUsername("fatima_hassan");
        user5.setEmail("fatima@example.com");
        user5.setPasswordHash("$2a$10$dummyhash5");
        user5.setRole(User.Role.USER);
        user5.setStatus(User.Status.ACTIVE);
        userRepository.save(user5);

        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@example.com");
        admin.setPasswordHash("$2a$10$dummyhashadmin");
        admin.setRole(User.Role.ADMIN);
        admin.setStatus(User.Status.ACTIVE);
        userRepository.save(admin);

        // Create sample city
        City lahore = new City();
        lahore.setName("Lahore");
        cityRepository.save(lahore);

        // Create sample zones
        Zone gulberg = new Zone();
        gulberg.setName("Gulberg");
        gulberg.setCity(lahore);
        zoneRepository.save(gulberg);

        Zone dha = new Zone();
        dha.setName("DHA");
        dha.setCity(lahore);
        zoneRepository.save(dha);

        Zone modelTown = new Zone();
        modelTown.setName("Model Town");
        modelTown.setCity(lahore);
        zoneRepository.save(modelTown);

        Zone joharTown = new Zone();
        joharTown.setName("Johar Town");
        joharTown.setCity(lahore);
        zoneRepository.save(joharTown);

        // Create sample areas
        Area gulbergBlockA = new Area();
        gulbergBlockA.setName("Block A");
        gulbergBlockA.setZone(gulberg);
        areaRepository.save(gulbergBlockA);

        Area dhaPhase2 = new Area();
        dhaPhase2.setName("Phase 2");
        dhaPhase2.setZone(dha);
        areaRepository.save(dhaPhase2);

        Area modelTownBlockC = new Area();
        modelTownBlockC.setName("Block C");
        modelTownBlockC.setZone(modelTown);
        areaRepository.save(modelTownBlockC);

        Area joharTownBlockB = new Area();
        joharTownBlockB.setName("Block B");
        joharTownBlockB.setZone(joharTown);
        areaRepository.save(joharTownBlockB);

        // Create sample issues
        Issue issue1 = new Issue();
        issue1.setTitle("Broken Street Light on Main Boulevard");
        issue1.setDescription(
                "The street light near the main boulevard intersection has been broken for over a week. This is causing safety concerns for pedestrians at night.");
        issue1.setCategory("Infrastructure");
        issue1.setPriority(Issue.Priority.HIGH);
        issue1.setStatus(Issue.IssueStatus.IN_PROGRESS);
        issue1.setUser(user2);
        issue1.setCity(lahore);
        issue1.setZone(gulberg);
        issue1.setArea(gulbergBlockA);
        issue1.setUpvotes(45);
        issueRepository.save(issue1);

        Issue issue2 = new Issue();
        issue2.setTitle("Garbage Collection Not Regular");
        issue2.setDescription(
                "Garbage collection has been irregular in our area for the past month. Waste is piling up and creating health hazards.");
        issue2.setCategory("Sanitation");
        issue2.setPriority(Issue.Priority.HIGH);
        issue2.setStatus(Issue.IssueStatus.PENDING);
        issue2.setUser(user3);
        issue2.setCity(lahore);
        issue2.setZone(dha);
        issue2.setArea(dhaPhase2);
        issue2.setUpvotes(89);
        issueRepository.save(issue2);

        Issue issue3 = new Issue();
        issue3.setTitle("Road Repair Needed Urgently");
        issue3.setDescription(
                "Large potholes have developed on the main road. Multiple vehicles have been damaged. Urgent repair needed.");
        issue3.setCategory("Infrastructure");
        issue3.setPriority(Issue.Priority.HIGH);
        issue3.setStatus(Issue.IssueStatus.PENDING);
        issue3.setUser(user4);
        issue3.setCity(lahore);
        issue3.setZone(modelTown);
        issue3.setArea(modelTownBlockC);
        issue3.setUpvotes(127);
        issueRepository.save(issue3);

        Issue issue4 = new Issue();
        issue4.setTitle("Water Supply Issues");
        issue4.setDescription("Water supply has been inconsistent. We only get water for 2-3 hours a day.");
        issue4.setCategory("Water Supply");
        issue4.setPriority(Issue.Priority.MEDIUM);
        issue4.setStatus(Issue.IssueStatus.RESOLVED);
        issue4.setUser(user5);
        issue4.setCity(lahore);
        issue4.setZone(joharTown);
        issue4.setArea(joharTownBlockB);
        issue4.setUpvotes(34);
        issue4.setResolvedAt(LocalDateTime.now().minusDays(1));
        issueRepository.save(issue4);

        // User 1 (Hassan) issues
        Issue issue5 = new Issue();
        issue5.setTitle("Street Light Repair Request");
        issue5.setDescription("Street light not working in our street for the past 3 days.");
        issue5.setCategory("Infrastructure");
        issue5.setPriority(Issue.Priority.MEDIUM);
        issue5.setStatus(Issue.IssueStatus.RESOLVED);
        issue5.setUser(user1);
        issue5.setCity(lahore);
        issue5.setZone(gulberg);
        issue5.setArea(gulbergBlockA);
        issue5.setUpvotes(12);
        issue5.setResolvedAt(LocalDateTime.now().minusDays(5));
        issueRepository.save(issue5);

        Issue issue6 = new Issue();
        issue6.setTitle("Pothole on Main Road");
        issue6.setDescription("Large pothole causing traffic issues and vehicle damage.");
        issue6.setCategory("Infrastructure");
        issue6.setPriority(Issue.Priority.HIGH);
        issue6.setStatus(Issue.IssueStatus.IN_PROGRESS);
        issue6.setUser(user1);
        issue6.setCity(lahore);
        issue6.setZone(dha);
        issue6.setArea(dhaPhase2);
        issue6.setUpvotes(23);
        issueRepository.save(issue6);

        Issue issue7 = new Issue();
        issue7.setTitle("Garbage Collection Issue");
        issue7.setDescription("Garbage not collected for 3 days in our block.");
        issue7.setCategory("Sanitation");
        issue7.setPriority(Issue.Priority.MEDIUM);
        issue7.setStatus(Issue.IssueStatus.PENDING);
        issue7.setUser(user1);
        issue7.setCity(lahore);
        issue7.setZone(modelTown);
        issue7.setArea(modelTownBlockC);
        issue7.setUpvotes(8);
        issueRepository.save(issue7);

        // Create some upvotes
        Upvote upvote1 = new Upvote();
        upvote1.setUser(user1);
        upvote1.setIssue(issue1);
        upvoteRepository.save(upvote1);

        Upvote upvote2 = new Upvote();
        upvote2.setUser(user1);
        upvote2.setIssue(issue2);
        upvoteRepository.save(upvote2);

        Upvote upvote3 = new Upvote();
        upvote3.setUser(user1);
        upvote3.setIssue(issue3);
        upvoteRepository.save(upvote3);

        System.out.println("Sample data initialized successfully!");
        System.out.println("Created 6 users (5 regular + 1 admin)");
        System.out.println("Created 1 city, 4 zones, 4 areas");
        System.out.println("Created 7 issues with various statuses");
    }
}
