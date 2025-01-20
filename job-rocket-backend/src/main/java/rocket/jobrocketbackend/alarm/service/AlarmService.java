package rocket.jobrocketbackend.alarm.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.alarm.entity.AlarmEntity;
import rocket.jobrocketbackend.alarm.repository.AlarmRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AlarmService {

    private AlarmRepository alarmRepository;

    public Map<String, Object> getUserAlarmData(Long userId){
        AlarmEntity alarm = alarmRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));
        return Map.of(
                "id",alarm.getId(),
                "type", alarm.getType(),
                "content", alarm.getContent(),
                "time", alarm.getAlarmDate()
        );

    }


}
