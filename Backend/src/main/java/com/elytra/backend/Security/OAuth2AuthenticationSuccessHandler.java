package com.elytra.backend.Security;

import com.elytra.backend.Models.User;
import com.elytra.backend.Repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

        @Value("${app.oauth2.redirect-uri}")
        private String oauth2RedirectUri;

        @Autowired
        private JwtTokenProvider jwtTokenProvider;

        @Autowired
        private UserRepository userRepository;

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                        Authentication authentication) throws IOException, ServletException {

                OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
                String email = oAuth2User.getAttribute("email");

                // Find user in database
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found after OAuth2 authentication"));

                // Generate JWT token
                String token = jwtTokenProvider.generateTokenFromUsername(user.getUsername());

                // Redirect to frontend with token in URL fragment (not sent to server logs/proxies)
                String encodedToken = UriUtils.encode(token, StandardCharsets.UTF_8);
                String targetUrl = UriComponentsBuilder.fromUriString(oauth2RedirectUri)
                                .build().toUriString() + "#token=" + encodedToken;

                getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
}
