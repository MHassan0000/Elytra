package com.elytra.backend.Security;

import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            logger.debug("OAuth2 user loading for provider: {}",
                    userRequest.getClientRegistration().getRegistrationId());

            OAuth2User result = processOAuth2User(userRequest, oAuth2User);
            logger.debug("OAuth2 user loaded successfully");
            return result;
        } catch (Exception ex) {
            logger.error("OAuth2 user loading failed", ex);
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfo oAuth2UserInfo = getOAuth2UserInfo(registrationId, oAuth2User.getAttributes());

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new RuntimeException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Update existing user
            user = updateExistingUser(user, oAuth2UserInfo, registrationId);
        } else {
            // Create new user
            user = registerNewUser(userRequest, oAuth2UserInfo, registrationId);
        }

        // Return OAuth2User with user details
        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        return new DefaultOAuth2User(authorities, attributes, userNameAttributeName);
    }

    private OAuth2UserInfo getOAuth2UserInfo(String registrationId, java.util.Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase("google")) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase("github")) {
            return new GithubOAuth2UserInfo(attributes);
        } else {
            throw new RuntimeException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }

    private User registerNewUser(OAuth2UserRequest userRequest, OAuth2UserInfo oAuth2UserInfo, String registrationId) {
        try {
            User user = new User();

            // Map provider name to AuthProvider enum
            User.AuthProvider provider;
            if (registrationId.equalsIgnoreCase("google")) {
                provider = User.AuthProvider.GOOGLE;
            } else if (registrationId.equalsIgnoreCase("github")) {
                provider = User.AuthProvider.GITHUB;
            } else {
                provider = User.AuthProvider.LOCAL;
            }

            user.setProvider(provider);
            user.setProviderId(oAuth2UserInfo.getId());
            user.setUsername(oAuth2UserInfo.getName());
            user.setEmail(oAuth2UserInfo.getEmail());
            user.setProfilePicture(oAuth2UserInfo.getImageUrl());
            user.setEmailVerified(true);
            user.setRole(User.Role.USER);
            user.setStatus(User.Status.ACTIVE);

            logger.info("Saving new OAuth2 user");
            User savedUser = userRepository.save(user);
            logger.info("OAuth2 user saved successfully with ID: {}", savedUser.getId());
            return savedUser;
        } catch (Exception e) {
            logger.error("Failed to save OAuth2 user", e);
            throw new RuntimeException("Failed to register OAuth2 user: " + e.getMessage(), e);
        }
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo, String registrationId) {
        // Only update profile picture from OAuth2, don't overwrite username
        // This allows users to customize their username in settings
        existingUser.setProfilePicture(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }
}
