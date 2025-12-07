package com.elytra.backend.Config;

import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // SINGLE ADMIN CREDENTIALS - Only one admin allowed in the system
    private static final String ADMIN_EMAIL = "admin@elytra.com";
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "AdminElytra2024!";

    @Override
    public void run(String... args) throws Exception {
        // Find all users with ADMIN role
        List<User> existingAdmins = userRepository.findAll().stream()
                .filter(user -> user.getRole() == User.Role.ADMIN)
                .toList();

        // If there are multiple admins, remove all except the one with correct email
        if (existingAdmins.size() > 1) {
            logger.warn("Multiple admin users found! Cleaning up...");
            for (User admin : existingAdmins) {
                if (!admin.getEmail().equals(ADMIN_EMAIL)) {
                    logger.info("Removing unauthorized admin: {}", admin.getEmail());
                    userRepository.delete(admin);
                }
            }
        }

        // Check if the correct admin exists (by email OR username)
        User admin = userRepository.findByEmail(ADMIN_EMAIL).orElse(null);
        if (admin == null) {
            admin = userRepository.findByUsername(ADMIN_USERNAME).orElse(null);
        }

        if (admin != null) {
            // Update existing admin to ensure correct credentials
            logger.info("Admin user found. Ensuring credentials are correct...");
            admin.setUsername(ADMIN_USERNAME);
            admin.setEmail(ADMIN_EMAIL);
            admin.setPasswordHash(passwordEncoder.encode(ADMIN_PASSWORD));
            admin.setRole(User.Role.ADMIN);
            admin.setProvider(User.AuthProvider.LOCAL);
            admin.setStatus(User.Status.ACTIVE);
            admin.setEmailVerified(true);
            userRepository.save(admin);

            logger.info("=================================================");
            logger.info("SINGLE ADMIN USER - Credentials Updated");
            logger.info("Email: {}", ADMIN_EMAIL);
            logger.info("Username: {}", ADMIN_USERNAME);
            logger.info("Password: {} (BCrypt hashed)", ADMIN_PASSWORD);
            logger.info("=================================================");
        } else {
            // Create the single admin user
            admin = new User();
            admin.setUsername(ADMIN_USERNAME);
            admin.setEmail(ADMIN_EMAIL);
            admin.setPasswordHash(passwordEncoder.encode(ADMIN_PASSWORD));
            admin.setRole(User.Role.ADMIN);
            admin.setProvider(User.AuthProvider.LOCAL);
            admin.setStatus(User.Status.ACTIVE);
            admin.setEmailVerified(true);
            userRepository.save(admin);

            logger.info("=================================================");
            logger.info("SINGLE ADMIN USER - Created Successfully");
            logger.info("Email: {}", ADMIN_EMAIL);
            logger.info("Username: {}", ADMIN_USERNAME);
            logger.info("Password: {} (BCrypt hashed)", ADMIN_PASSWORD);
            logger.info("This is the ONLY admin in the system");
            logger.info("=================================================");
        }
    }
}
