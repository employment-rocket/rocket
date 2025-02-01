package rocket.jobrocketbackend.alarm.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rocket.jobrocketbackend.alarm.dto.AlarmDTO;
import rocket.jobrocketbackend.alarm.entity.AlarmEntity;
import rocket.jobrocketbackend.alarm.repository.AlarmRepository;
import rocket.jobrocketbackend.common.entity.AlarmType;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AlarmService {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final AlarmRepository alarmRepository;
    private final UserRepository userRepository;

    public SseEmitter subscribe(Long userId) {
        SseEmitter emitter = new SseEmitter(5 * 60 * 1000L);
        emitters.put(userId, emitter);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));

        try {
            emitter.send(SseEmitter.event().name("connect").data("SSE 연결 성공"));
        } catch (IOException e) {
            emitter.complete();
        }

        return emitter;
    }

    @Transactional
    public void sendAlarm(Long userId, String message) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("해당 id의 사용자를 찾을 수 없습니다: "+userId));

        AlarmEntity alarmEntity = AlarmEntity.builder()
                        .content(message)
                        .type(AlarmType.SCHEDULE)
                        .alarmDate(LocalDate.now())
                        .user(user)
                        .build();

        alarmRepository.save(alarmEntity);
        log.info("넣은 알람데이터 내용: {} {}", alarmEntity.getContent(), alarmEntity.getUser());

        SseEmitter emitter = emitters.get(userId);

        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("alarm").data(message));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        }
    }
}