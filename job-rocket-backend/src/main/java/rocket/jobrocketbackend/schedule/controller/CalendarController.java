package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.schedule.controller.response.ScheduleResponse;
import rocket.jobrocketbackend.schedule.service.CalendarService;

import java.util.List;

@RequestMapping("/schedules")
@RestController
@Slf4j
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/calendars")
    public ResponseEntity<List<ScheduleResponse>> calendarList(@AuthenticationPrincipal CustomOAuth2User user) {
        List<ScheduleResponse> result = calendarService.getScheduleList(user.getId()).stream().map(ScheduleResponse::from).toList();
        return ResponseEntity.ok(result);
    }
}
