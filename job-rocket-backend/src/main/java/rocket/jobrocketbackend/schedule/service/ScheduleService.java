package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleUpdateTypeRequest;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Transactional
    public ScheduleDTO createScheduleFrom(ScheduleCreateDTO dto){
        ScheduleEntity schedule = scheduleRepository.save(dto.toNewScheduleEntity());
        return ScheduleDTO.from(schedule);
    }

    public Map<String, List<ScheduleDTO>> getScheduleList(Long userId){
        //TODO 이것도 UserId -> UserEntity사용으로 바꾸기
        Map<String, List<ScheduleDTO>> result = scheduleRepository.findByUserId(userId)
                .stream().map(ScheduleDTO::from).collect(Collectors.groupingBy(dto -> dto.getType().name()));

        for (ScheduleType type : ScheduleType.values()) {
            String key = type.name();
            result.putIfAbsent(key, new ArrayList<ScheduleDTO>());
        }
        return result;
    }

    public ScheduleDTO updateSceduleType(ScheduleUpdateTypeRequest request){
        return null;
    }
}
