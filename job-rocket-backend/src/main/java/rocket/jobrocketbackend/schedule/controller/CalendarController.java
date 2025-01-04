package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity<List<ScheduleResponse>> calendarList() {
        //TODO 추후에 하드코딩 수정
        Long memberId = 1L;
        List<ScheduleResponse> result = calendarService.getScheduleList(memberId).stream().map(ScheduleResponse::from).toList();
        return ResponseEntity.ok(result);
    }
}
