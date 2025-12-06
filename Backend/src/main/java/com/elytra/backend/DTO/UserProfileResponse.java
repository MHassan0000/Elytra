package com.elytra.backend.DTO;

import lombok.Data;

@Data
public class UserProfileResponse {

    private Long id;
    private String username;
    private String email;
    private String role;
    private String status;
    private String provider;
    private String profilePicture;
    private Boolean emailVerified;
    private String createdAt;
}
