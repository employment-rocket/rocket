package rocket.jobrocketbackend.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.oauth.service.KakaoOAuthService;
import rocket.jobrocketbackend.oauth.util.JWTUtil;

import java.util.Map;

@RestController
@RequestMapping("/login")
@Slf4j
@RequiredArgsConstructor
public class OAuthController {


    private final KakaoOAuthService kakaoOAuthService;
    private final JWTUtil jwtUtil;

    @GetMapping("/oauth2/kakao")
    public ResponseEntity<Map<String, String>> getKakao(@RequestParam("code") String code) throws JsonProcessingException {
        Map<String, String> tokens = kakaoOAuthService.getAccessTokenAndrefreshToken(code);
        return ResponseEntity.ok(tokens);
    }

    //refreshToken으로 AccessToken 재발급
    @PostMapping("/auth/refresh")
    public ResponseEntity<Map<String,String>> refreshAccessToken(@RequestHeader("Authorization-refresh") String refreshToken){
        try {
            String newAccessToken = jwtUtil.newAccessToken(refreshToken);
            log.info("newAccessToken: {}",newAccessToken);
            //새로운 AccessToken을 헤더에 담아 반환
            return ResponseEntity.ok()
                    .header("Authorization",newAccessToken)
                    .build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Refresh token invalid or expired"));
        }
    }
}
