package rocket.jobrocketbackend.oauth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.oauth.service.KakaoOAuthService;

import java.util.Map;

@RestController
@RequestMapping("/login")
@Slf4j
@RequiredArgsConstructor
public class OAuthController {


    private final KakaoOAuthService kakaoOAuthService;


    @GetMapping("/oauth2/kakao")
    public ResponseEntity<String> getKakao(@RequestParam("code") String code) throws JsonProcessingException {
        String token = kakaoOAuthService.getAccessToken(code);
        return ResponseEntity.ok(token);
    }
}
