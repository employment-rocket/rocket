package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleCreateRequest;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleModifyRequest;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleModifyTypeRequest;
import rocket.jobrocketbackend.schedule.controller.response.ScheduleResponse;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.service.ScheduleService;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedules")
@Slf4j
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<Map<String, List<ScheduleResponse>>> scheduleList(@AuthenticationPrincipal CustomOAuth2User user) {
        HashMap<String, List<ScheduleResponse>> response = new HashMap<>();
        Map<String, List<ScheduleDTO>> map = scheduleService.getScheduleList(user.getId());

        for (String key : map.keySet()) {
            response.put(key, map.get(key).stream()
                    .map(ScheduleResponse::from)
                    .sorted(Comparator.comparing(ScheduleResponse::getDueDate))
                    .toList());
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/with-questions")
    public ResponseEntity<List<ScheduleResponse>> scheduleListWithQuestions(@AuthenticationPrincipal CustomOAuth2User user) {
        List<ScheduleResponse> response = scheduleService.getScheduleListWithQuestions(user.getId()).stream()
                .map(ScheduleResponse::from)
                .sorted(Comparator.comparing(ScheduleResponse::getDueDate))
                .toList();
        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public ResponseEntity<ScheduleResponse> scheduleTypeModify(@RequestBody ScheduleModifyTypeRequest request) {
        ScheduleDTO dto = scheduleService.modifyType(request.toTypeModifyDto());
        return new ResponseEntity<>(ScheduleResponse.from(dto), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ScheduleResponse> scheduleCreate(@Validated @RequestBody ScheduleCreateRequest request, @AuthenticationPrincipal CustomOAuth2User user) {
        ScheduleCreateDTO createDTO = request.toCreateDTO();
        ScheduleDTO dto = scheduleService.create(createDTO, user.getId());
        return new ResponseEntity<>(ScheduleResponse.from(dto), HttpStatus.CREATED);
    }

    @PostMapping("/review")
    public ResponseEntity<ScheduleResponse> createReview(@RequestParam Long scheduleId) {
        ScheduleDTO dto = scheduleService.createReview(scheduleId);
        return ResponseEntity.ok(ScheduleResponse.from(dto));
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> scheduleDelete(@PathVariable("scheduleId") Long scheduleId) {
        log.info("deleteId = {}", scheduleId);
        scheduleService.delete(scheduleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> scheduleModify(@PathVariable("scheduleId") Long scheduleId, @RequestBody ScheduleModifyRequest request) {
        scheduleService.modify(request.toModifyDto(scheduleId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
