package rocket.jobrocketbackend.oauth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.common.entity.SocialType;
import rocket.jobrocketbackend.oauth.userInfo.KakaoOAuth2UserInfo;
import rocket.jobrocketbackend.oauth.userInfo.OAuth2UserInfo;
import rocket.jobrocketbackend.oauth.util.JWTUtil;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import rocket.jobrocketbackend.user.util.NicknameGenerator;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class KakaoOAuthService {

    private final  RestTemplate oauth2Client;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    public KakaoOAuthService(@Qualifier("restTemplate") RestTemplate oauth2Client,
                             ObjectMapper objectMapper,
                             UserRepository userRepository,
                             JWTUtil jwtUtil) {
        this.oauth2Client = oauth2Client;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URI;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.provider.kakao.token_uri}")
    private String TOKEN_URL;

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private String USER_INFO_URI;

    public Map<String, String> getAccessTokenAndrefreshToken(String token) throws JsonProcessingException {

        String accessToken = getKakaoAccessToken(token);
        OAuth2UserInfo kakaouserInfo = getKakaoUserInfo(accessToken);
        UserEntity userEntity = saveOrUpdateUser(kakaouserInfo);

        String jwtAccessToken = jwtUtil.createAccessToken(userEntity.getEmail());
        String jwtRefreshToken = jwtUtil.createRefreshToken(userEntity.getEmail());

        userEntity.updateRefreshToken(jwtRefreshToken);
        userRepository.save(userEntity);

        //클라이언트에 반환할 토큰
        Map<String, String> tokens = Map.of(
                "accessToken", jwtAccessToken,
                "refreshToken", jwtRefreshToken
        );

        return tokens;
    }


    public String getKakaoAccessToken(String code) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("redirect_uri", REDIRECT_URI);
        body.add("code", code);
        body.add("client_secret", CLIENT_SECRET);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = oauth2Client.postForEntity(TOKEN_URL, request, String.class);
        try {
            Map<String, String> responseBody = objectMapper.readValue(response.getBody(), Map.class);
            String accessToken = responseBody.get("access_token");
            return accessToken;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse access token response", e);
        }
    }

    public OAuth2UserInfo getKakaoUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = oauth2Client.exchange(USER_INFO_URI, HttpMethod.GET, request, Map.class);
        Map<String, Map<String,Object>> responseBody = response.getBody();
        OAuth2UserInfo userInfo = new KakaoOAuth2UserInfo(responseBody.get("kakao_account"));
        return userInfo;
    }

    private UserEntity saveOrUpdateUser(OAuth2UserInfo kakaoUserInfo) {
        String email = kakaoUserInfo.getEmail();
        String profileImage = kakaoUserInfo.getProfileImage();

        log.info("profileImage = {}", profileImage);

        // 이메일로 유저 조회
        Optional<UserEntity> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            // 기존 유저 정보 업데이트
            UserEntity user = existingUser.get();
            return userRepository.save(user);
        } else {
            String nickname = NicknameGenerator.generateNickname();
            // 새로운 유저 저장
            UserEntity newUser = UserEntity.builder()
                    .email(email)
                    .nickname(nickname)
                    .profile(profileImage)
                    .socialType(SocialType.KAKAO)
                    .role(Role.MEMBER) // 기본 역할 부여
                    .allowEmail(false) // 동의항목에 따른 설정
                    .build();
            return userRepository.save(newUser);
        }
    }


}
