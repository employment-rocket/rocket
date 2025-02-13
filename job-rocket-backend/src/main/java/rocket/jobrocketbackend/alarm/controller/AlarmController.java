package rocket.jobrocketbackend.alarm.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.alarm.service.AlarmService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class AlarmController {
    
    private final AlarmService alarmService;

    @GetMapping("/alarm")
    public ResponseEntity<?> getAlarmData(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        Long memberId = customOAuth2User.getId();
        List<Map<String, Object>> alarmData = alarmService.getUserAlarmData(memberId);

        return ResponseEntity.ok(alarmData);
    }
}