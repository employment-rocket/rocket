package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleCreateRequest;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleModifyRequest;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleModifyTypeRequest;
import rocket.jobrocketbackend.schedule.controller.response.ScheduleResponse;
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
    public ResponseEntity<Map<String ,List<ScheduleResponse>>> scheduleList(){
        HashMap<String, List<ScheduleResponse>> response = new HashMap<>();
        Map<String, List<ScheduleDTO>> map = scheduleService.getScheduleList(1L);
        for(String key : map.keySet()){
            response.put(key,map.get(key).stream().map(ScheduleResponse::from).sorted(Comparator.comparing(ScheduleResponse::getDueDate)).toList());
        }
        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public ResponseEntity<ScheduleResponse> scheduleTypeModify(@RequestBody ScheduleModifyTypeRequest request){
        ScheduleDTO dto = scheduleService.modifyType(request.toTypeModifyDto());
        return new ResponseEntity<>(ScheduleResponse.from(dto),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ScheduleResponse> scheduleCreate(@Validated @RequestBody ScheduleCreateRequest request){
        //TODO 로그인 기능관련 병합후 추후 처리
        ScheduleDTO dto = scheduleService.create(request.toCreateDTO());
        return new ResponseEntity<>(ScheduleResponse.from(dto),HttpStatus.CREATED);
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> scheduleDelete(@PathVariable("scheduleId") Long scheduleId){
        log.info("deleteId = {}",scheduleId);
        scheduleService.delete(scheduleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> scheduleModify(@PathVariable("scheduleId") Long scheduleId,@RequestBody ScheduleModifyRequest request){
        scheduleService.modify(request.toModifyDto(scheduleId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

