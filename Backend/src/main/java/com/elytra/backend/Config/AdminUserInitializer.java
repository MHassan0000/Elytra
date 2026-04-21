package com.elytra.backend.Config;

import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${app.admin.email:admin@elytra.com}")
    private String adminEmail;

    @Value("${app.admin.username:admin}")
    private String adminUsername;

    @Value("${app.admin.password:}")
    private String adminPassword;

    private boolean hasConfiguredAdminPassword() {
        return adminPassword != null && !adminPassword.isBlank();
    }

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
                if (!admin.getEmail().equals(adminEmail)) {
                    logger.info("Removing unauthorized admin: {}", admin.getEmail());
                    userRepository.delete(admin);
                }
            }
        }

        // Check if the correct admin exists (by email OR username)
        User admin = userRepository.findByEmail(adminEmail).orElse(null);
        if (admin == null) {
            admin = userRepository.findByUsername(adminUsername).orElse(null);
        }

        if (admin != null) {
            // Update existing admin to ensure profile and role are correct
            logger.info("Admin user found. Ensuring credentials are correct...");
            admin.setUsername(adminUsername);
            admin.setEmail(adminEmail);
            admin.setRole(User.Role.ADMIN);
            admin.setProvider(User.AuthProvider.LOCAL);
            admin.setStatus(User.Status.ACTIVE);
            admin.setEmailVerified(true);

            if (hasConfiguredAdminPassword()) {
                admin.setPasswordHash(passwordEncoder.encode(adminPassword));
                logger.info("Admin password updated from configured environment value.");
            } else {
                logger.warn("Admin password not configured. Keeping existing password unchanged.");
            }

            userRepository.save(admin);

            logger.info("=================================================");
            logger.info("SINGLE ADMIN USER - Credentials Updated");
            logger.info("Email: {}", adminEmail);
            logger.info("Username: {}", adminUsername);
            logger.info("=================================================");
        } else {
            if (!hasConfiguredAdminPassword()) {
                throw new IllegalStateException(
                        "No admin user exists and no admin password is configured. Set APP_ADMIN_PASSWORD before startup.");
            }

            // Create the single admin user
            admin = new User();
            admin.setUsername(adminUsername);
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
            admin.setRole(User.Role.ADMIN);
            admin.setProvider(User.AuthProvider.LOCAL);
            admin.setStatus(User.Status.ACTIVE);
            admin.setEmailVerified(true);
            userRepository.save(admin);

            logger.info("=================================================");
            logger.info("SINGLE ADMIN USER - Created Successfully");
            logger.info("Email: {}", adminEmail);
            logger.info("Username: {}", adminUsername);
            logger.info("This is the ONLY admin in the system");
            logger.info("=================================================");
        }
    }
}
