package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void createScheduleFrom(ScheduleDTO dto){
        ScheduleEntity newSchedule = ScheduleEntity.builder()
                .title(dto.getTitle())
                .type(ScheduleType.Document)
                .dueDate(dto.getDueDate())
                .memo(dto.getMemo())
                .userId(1L)
                .state(ScheduleState.from(dto.getState()))
                .build();
        scheduleRepository.save(newSchedule);
    }
}
