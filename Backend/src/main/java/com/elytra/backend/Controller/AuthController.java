package com.elytra.backend.Controller;

import com.elytra.backend.DTO.*;
import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.UserRepository;
import com.elytra.backend.Security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@SuppressWarnings("null")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            // Check if username exists
            if (userRepository.existsByUsername(signupRequest.getUsername())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Username is already taken");
                return ResponseEntity.badRequest().body(error);
            }

            // Check if email exists
            if (userRepository.existsByEmail(signupRequest.getEmail())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email is already in use");
                return ResponseEntity.badRequest().body(error);
            }

            // Create new user
            User user = new User();
            user.setUsername(signupRequest.getUsername());
            user.setEmail(signupRequest.getEmail());
            user.setPasswordHash(passwordEncoder.encode(signupRequest.getPassword()));
            // SECURITY: All signups are USER role only. Admin is created via
            // AdminUserInitializer
            user.setRole(User.Role.USER);
            user.setStatus(User.Status.ACTIVE);
            user.setProvider(User.AuthProvider.LOCAL);
            user.setEmailVerified(false);

            User savedUser = userRepository.save(user);

            // Generate JWT token
            String token = tokenProvider.generateTokenFromUsername(savedUser.getUsername());

            AuthResponse authResponse = new AuthResponse(
                    token,
                    savedUser.getId(),
                    savedUser.getUsername(),
                    savedUser.getEmail(),
                    savedUser.getRole().name(),
                    savedUser.getProvider().name());

            return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
        } catch (Exception e) {
            logger.error("User registration failed", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to register user");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenProvider.generateToken(authentication);

            User user = (User) authentication.getPrincipal();

            AuthResponse authResponse = new AuthResponse(
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().name(),
                    user.getProvider().name());

            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            logger.warn("Login failed for email: {}", loginRequest.getEmail());
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "User not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        UserProfileResponse profile = new UserProfileResponse();
        profile.setId(currentUser.getId());
        profile.setUsername(currentUser.getUsername());
        profile.setEmail(currentUser.getEmail());
        profile.setRole(currentUser.getRole().name());
        profile.setStatus(currentUser.getStatus().name());
        profile.setProvider(currentUser.getProvider().name());
        profile.setProfilePicture(currentUser.getProfilePicture());
        profile.setEmailVerified(currentUser.getEmailVerified());
        profile.setCreatedAt(currentUser.getCreatedAt().toString());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal User currentUser,
            @Valid @RequestBody UpdateProfileRequest updateRequest) {
        try {
            if (currentUser == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not authenticated");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            User user = userRepository.findById(currentUser.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean usernameChanged = false;
            if (updateRequest.getUsername() != null) {
                // Check if username is already taken by another user
                if (userRepository.existsByUsername(updateRequest.getUsername()) &&
                        !user.getUsername().equals(updateRequest.getUsername())) {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Username is already taken");
                    return ResponseEntity.badRequest().body(error);
                }
                if (!user.getUsername().equals(updateRequest.getUsername())) {
                    usernameChanged = true;
                }
                user.setUsername(updateRequest.getUsername());
            }

            if (updateRequest.getProfilePicture() != null) {
                user.setProfilePicture(updateRequest.getProfilePicture());
            }

            User updatedUser = userRepository.save(user);

            // Generate new token if username changed
            String newToken = null;
            if (usernameChanged) {
                newToken = tokenProvider.generateTokenFromUsername(updatedUser.getUsername());
            }

            Map<String, Object> response = new HashMap<>();

            UserProfileResponse profile = new UserProfileResponse();
            profile.setId(updatedUser.getId());
            profile.setUsername(updatedUser.getUsername());
            profile.setEmail(updatedUser.getEmail());
            profile.setRole(updatedUser.getRole().name());
            profile.setStatus(updatedUser.getStatus().name());
            profile.setProvider(updatedUser.getProvider().name());
            profile.setProfilePicture(updatedUser.getProfilePicture());
            profile.setEmailVerified(updatedUser.getEmailVerified());
            profile.setCreatedAt(updatedUser.getCreatedAt().toString());

            response.put("user", profile);
            if (newToken != null) {
                response.put("token", newToken);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Profile update failed for user id: {}", currentUser != null ? currentUser.getId() : "unknown", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update profile");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        SecurityContextHolder.clearContext();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
}
