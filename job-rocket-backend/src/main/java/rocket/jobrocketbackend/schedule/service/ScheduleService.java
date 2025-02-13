package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.alarm.service.AlarmService;
import rocket.jobrocketbackend.common.entity.AlarmType;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleModifyDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleTypeModifyDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.exception.ScheduleNotFoundException;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@EnableScheduling
@Slf4j
public class ScheduleService {

    private final AlarmService alarmService;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    @Transactional
    public ScheduleDTO create(final ScheduleCreateDTO dto, final Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자 정보 없음"));
        ScheduleEntity schedule = scheduleRepository.save(ScheduleEntity.create(dto, user));
        return ScheduleDTO.from(schedule);
    }

    public Map<String, List<ScheduleDTO>> getScheduleList(final Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자 정보 없음"));

        Map<String, List<ScheduleDTO>> result = scheduleRepository.findByUser(user)
                .stream().map(ScheduleDTO::from)
                .collect(Collectors.groupingBy(dto -> dto.getType().name()));

        for (ScheduleType type : ScheduleType.values()) {
            String key = type.name();
            result.putIfAbsent(key, new ArrayList<>());
        }
        return result;
    }

    public List<ScheduleDTO> getScheduleListWithQuestions(final Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자 정보 없음"));

        return scheduleRepository.findByUser(user).stream()
                .filter(schedule -> schedule.getQuestions() != null && !schedule.getQuestions().isEmpty())
                .map(ScheduleDTO::from)
                .toList();
    }

    @Transactional
    public ScheduleDTO createReview(Long scheduleId) {
        ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleNotFoundException("해당 일정이 존재하지 않습니다."));

        return ScheduleDTO.from(schedule);
    }

    @Transactional
    public ScheduleDTO modifyType(final ScheduleTypeModifyDTO dto) {
        ScheduleEntity schedule = scheduleRepository.findById(dto.getScheduleId())
                .orElseThrow(() -> new ScheduleNotFoundException("해당하는 일정을 찾을 수 없습니다."));
        schedule.modifyType(dto.getType());
        return ScheduleDTO.from(schedule);
    }
    @Transactional
    public void delete(final Long id) {
        scheduleRepository.deleteById(id);
    }
    @Transactional
    public void modify(final ScheduleModifyDTO dto) {
        ScheduleEntity schedule = scheduleRepository.findById(dto.getId())
                .orElseThrow(() -> new ScheduleNotFoundException("해당하는 일정을 찾을 수 없습니다."));
        schedule.modify(dto);
    }

//자정마다
    @Scheduled(cron="0 30 20 * * *")
    public void checkScheduleDeadlines(){
        LocalDate tomorrow = LocalDate.now().plusDays(1);

        List<ScheduleEntity> schedules = scheduleRepository.findByStateAndDueDate(ScheduleState.ONGOING, tomorrow);

        for (ScheduleEntity schedule : schedules) {
            Long userId = schedule.getUser().getId();
            String message = "'" + schedule.getTitle() + "' 일정이 하루 남았습니다!";

            alarmService.sendScheduleAlarm(userId, message, AlarmType.SCHEDULE);
        }
    }
}
