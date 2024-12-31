package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleModifyDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleTypeModifyDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.exception.ScheduleNotFoundException;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;
import rocket.jobrocketbackend.user.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    @Transactional
    public ScheduleDTO create(ScheduleCreateDTO dto){
        UserEntity user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new UserNotFoundException("사용자 정보 없음"));
        ScheduleEntity schedule = scheduleRepository.save(dto.toCreateEntity(user));
        return ScheduleDTO.from(schedule);
    }

    public Map<String, List<ScheduleDTO>> getScheduleList(Long userId){
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("사용자 정보 없음"));
        Map<String, List<ScheduleDTO>> result = scheduleRepository.findByUser(user)
                .stream().map(ScheduleDTO::from).collect(Collectors.groupingBy(dto -> dto.getType().name()));

        for (ScheduleType type : ScheduleType.values()) {
            String key = type.name();
            result.putIfAbsent(key, new ArrayList<>());
        }
        return result;
    }
    @Transactional
    public ScheduleDTO modifyType(ScheduleTypeModifyDTO dto){
        ScheduleEntity schedule = scheduleRepository.findById(dto.getScheduleId()).orElseThrow(() -> new ScheduleNotFoundException("해당하는 일정을 찾을 수 없습니다."));
        schedule.modifyType(dto.getType());
        return ScheduleDTO.from(schedule);
    }
    @Transactional
    public void delete(Long id) {
        scheduleRepository.deleteById(id);
    }
    @Transactional
    public void modify(ScheduleModifyDTO dto){
        ScheduleEntity schedule = scheduleRepository.findById(dto.getId()).orElseThrow(() -> new ScheduleNotFoundException("해당하는 일정을 찾을 수 없습니다."));
        schedule.modify(dto);
    }
}
