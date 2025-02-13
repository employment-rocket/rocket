package rocket.jobrocketbackend.alarm.controller;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rocket.jobrocketbackend.alarm.dto.AlarmDTO;
import rocket.jobrocketbackend.alarm.repository.AlarmRepository;
import rocket.jobrocketbackend.alarm.service.AlarmService;
import rocket.jobrocketbackend.alarm.util.CustomSubscription;
import rocket.jobrocketbackend.common.entity.AlarmType;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.oauth.util.JWTUtil;
import rocket.jobrocketbackend.user.service.UserService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
@Slf4j
public class AlarmController {

    private final AlarmService alarmService;
    private final JWTUtil jwtUtil;
    private final AlarmRepository alarmRepository;
    private final UserService userService;

    @GetMapping(path = "/sse",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestParam("token") String token) {

        Long userId = jwtUtil.getUserDto(token).getId();
        return alarmService.subscribe(userId);
    }

    @GetMapping("/list")
    public ResponseEntity<List<AlarmDTO>> getUserAlarms(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){
        List<AlarmDTO> alarms = alarmRepository.findByUserId(customOAuth2User.getId())
                .stream()
                .map(AlarmDTO::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(alarms);
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribeToPush(@RequestBody CustomSubscription subscription,
                                            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        alarmService.saveSubscription(customOAuth2User.getId(), subscription);
        return ResponseEntity.ok().build();
    }

}
