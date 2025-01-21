package rocket.jobrocketbackend.alarm.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.alarm.entity.AlarmEntity;
import rocket.jobrocketbackend.alarm.repository.AlarmRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AlarmService {

    private final AlarmRepository alarmRepository;

    public List<Map<String, Object>> getUserAlarmData(Long userId) {

        List<AlarmEntity> alarms = alarmRepository.findByUserId(userId);

        return alarms.stream().map(alarm -> {
            Map<String, Object> alarmMap = new HashMap<>();
            alarmMap.put("id", alarm.getId());
            alarmMap.put("type", alarm.getType());
            alarmMap.put("content", alarm.getContent());
            alarmMap.put("time", alarm.getAlarmDate());
            return alarmMap;
        }).collect(Collectors.toList());
    }


}
