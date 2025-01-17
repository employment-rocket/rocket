package rocket.jobrocketbackend.oauth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.common.entity.SocialType;
import rocket.jobrocketbackend.oauth.userInfo.NaverOAuth2UserInfo;
import rocket.jobrocketbackend.oauth.userInfo.OAuth2UserInfo;
import rocket.jobrocketbackend.oauth.util.JWTUtil;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.repository.MemberRepository;
import org.springframework.http.*;
import rocket.jobrocketbackend.member.util.NicknameGenerator;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NaverOAuthService {

    private final RestTemplate oauth2Client;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    private final JWTUtil jwtUtil;

    @Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
    private String REDIRECT_URI;

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String TOKEN_URL;

    @Value("${spring.security.oauth2.client.provider.naver.user-info-uri}")
    private String USER_INFO_URI;

    public Map<String, String> getAccessTokenAndRefreshToken(String code, String state) throws JsonProcessingException {
        String accessToken = getNaverAccessToken(code, state);
        OAuth2UserInfo naverUserInfo = getNaverUserInfo(accessToken);
        MemberEntity memberEntity = saveOrUpdateUser(naverUserInfo);

        String jwtAccessToken = jwtUtil.createAccessToken(memberEntity.getEmail());
        String jwtRefreshToken = jwtUtil.createRefreshToken(memberEntity.getEmail());

        memberEntity.updateRefreshToken(jwtRefreshToken);
        memberRepository.save(memberEntity);

        return Map.of(
                "accessToken", jwtAccessToken,
                "refreshToken", jwtRefreshToken
        );
    }

    private String getNaverAccessToken(String code, String state) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("client_secret", CLIENT_SECRET);
        body.add("redirect_uri", REDIRECT_URI);
        body.add("code", code);
        body.add("state", state);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = oauth2Client.postForEntity(TOKEN_URL, request, String.class);

        Map<String, String> responseBody = objectMapper.readValue(response.getBody(), Map.class);
        String accessToken = responseBody.get("access_token");

        return accessToken;
    }

    private OAuth2UserInfo getNaverUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = oauth2Client.exchange(USER_INFO_URI, HttpMethod.GET, request, Map.class);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody().get("response");
        OAuth2UserInfo userInfo = new NaverOAuth2UserInfo(responseBody);
        return userInfo;
    }

    private MemberEntity saveOrUpdateUser(OAuth2UserInfo naverUserInfo) {
        String email = naverUserInfo.getEmail();
        String profileImage = naverUserInfo.getProfileImage();

        log.info("Naver User Email: {}", email);

        Optional<MemberEntity> existingUser = memberRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            MemberEntity user = existingUser.get();
            return memberRepository.save(user);
        } else {
            String nickname = NicknameGenerator.generateNickname();
            MemberEntity newUser = MemberEntity.builder()
                    .email(email)
                    .nickname(nickname)
                    .profile(profileImage)
                    .socialType(SocialType.NAVER)
                    .role(Role.MEMBER)
                    .allowEmail(false)
                    .build();
            return memberRepository.save(newUser);
        }
    }
}
