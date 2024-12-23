package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleCreateRequest;
import rocket.jobrocketbackend.schedule.controller.response.ScheduleResponse;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.service.ScheduleService;

import java.util.Comparator;
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
    public ResponseEntity<Map<String ,List<ScheduleResponse>>> getScheduleList(){
        HashMap<String, List<ScheduleResponse>> response = new HashMap<>();
        Map<String, List<ScheduleDTO>> map = scheduleService.getScheduleList(1L);
        for(String key : map.keySet()){
            response.put(key,map.get(key).stream().map(ScheduleResponse::from).sorted(Comparator.comparing(ScheduleResponse::getDueDate)).toList());
        }
        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public void updateSchedule(){
        // TODO 나중에 내용 넣기
    }

    @PostMapping
    public ResponseEntity<Void> createSchedule(@RequestBody ScheduleCreateRequest request){
        //TODO 로그인 기능관련 병합후 추후 처리
        scheduleService.createScheduleFrom(ScheduleCreateDTO.from(request));
        return ResponseEntity.ok(null);
    }
}

