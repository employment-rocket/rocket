package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleCreateRequest;
import rocket.jobrocketbackend.schedule.controller.response.MockDto;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.service.ScheduleService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedule")
@Slf4j
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<Map<String ,List<MockDto>>> mockData(){
        HashMap<String, List<MockDto>> response = new HashMap<>();
        response.put("document", MockDto.getDocumentTypeMocks());
        response.put("first", MockDto.getFirstTypeMocks());
        response.put("second", MockDto.getSecondTypeMocks());
        response.put("final", MockDto.getFinalTypeMocks());
        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public void updateSchedule(){
        // TODO 나중에 내용 넣기
    }

    @PostMapping
    public ResponseEntity<Void> createSchedule(@RequestBody ScheduleCreateRequest request){
        //TODO 로그인 기능관련 병합후 추후 처리
        log.info("request = {}",request);
        scheduleService.createScheduleFrom(ScheduleDTO.from(request));
        return ResponseEntity.ok(null);
    }
}

