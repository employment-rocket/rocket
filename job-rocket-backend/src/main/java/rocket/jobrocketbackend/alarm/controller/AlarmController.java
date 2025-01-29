package rocket.jobrocketbackend.alarm.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rocket.jobrocketbackend.alarm.service.AlarmService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;


@RestController
@RequiredArgsConstructor
@RequestMapping("/sse")
@Slf4j
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(path = "/alarm",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long userId = customOAuth2User.getId();
        log.info("SSE 연결 요청: userId={}", userId);
        return alarmService.subscribe(userId);
    }
}
