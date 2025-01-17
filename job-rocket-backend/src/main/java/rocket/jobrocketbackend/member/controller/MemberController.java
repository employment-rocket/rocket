package rocket.jobrocketbackend.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.member.service.MemberService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        if (customOAuth2User == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication is missing");
        }
        Long memberId = customOAuth2User.getId();
        log.info("memberid: {}", memberId);

        try {
            Map<String, Object> userProfile = memberService.getUserProfileById(memberId);
            return ResponseEntity.ok(userProfile);

        } catch (Exception e) {
            log.error("Error fetching user profile: ", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
