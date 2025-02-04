package rocket.jobrocketbackend.alarm.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import jdk.jshell.JShell;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Subscription;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rocket.jobrocketbackend.alarm.dto.AlarmDTO;
import rocket.jobrocketbackend.alarm.entity.AlarmEntity;
import rocket.jobrocketbackend.alarm.entity.AlarmSubscriptionEntity;
import rocket.jobrocketbackend.alarm.repository.AlarmRepository;
import rocket.jobrocketbackend.alarm.repository.AlarmSubscriptionRepository;
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
@Slf4j
public class AlarmService {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final AlarmRepository alarmRepository;
    private final UserRepository userRepository;
    private final PushAlarmService pushAlarmService;
    private final AlarmSubscriptionRepository alarmSubscriptionRepository;
    private final ObjectMapper objectMapper;


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
    public void sendAlarm(Long userId, String message, AlarmType type) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("해당 id의 사용자를 찾을 수 없습니다: "+userId));

        if(type.equals(AlarmType.SCHEDULE)) {
            AlarmEntity alarmEntity = AlarmEntity.builder()
                    .content(message)
                    .type(AlarmType.SCHEDULE)
                    .alarmDate(LocalDate.now())
                    .user(user)
                    .url("/schedule")
                    .build();

            alarmRepository.save(alarmEntity);
            log.info("넣은 알람데이터 내용: {} {}", alarmEntity.getContent(), alarmEntity.getUser());

            alarmSubscriptionRepository.findByUserId(userId).ifPresent(subscription->
                    pushAlarmService.sendPushNotification(subscription.getWebPushSubscription(), "일정 마감 알림", message, alarmEntity.getUrl()));
        }
        SseEmitter emitter = emitters.get(userId);

        Map<String, String> data = new HashMap<>();
        data.put("content", message);
        data.put("type", String.valueOf(type));

        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("alarm").data(new ObjectMapper().writeValueAsString(data)));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        }

    }

    @Transactional
    public void saveSubscription(Long userId, Subscription subscription) {
        log.info("구독 정보 저장 요청: userId={}, subscription={}", userId, subscription);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        String subscriptionJson = AlarmSubscriptionEntity.convertSubscriptionToJson(subscription);

        AlarmSubscriptionEntity alarmSubscription = alarmSubscriptionRepository.findByUserId(userId)
                .map(existing -> {
                    log.info("기존구독 정보 업데이트");
                    existing.updateSubscription(subscriptionJson);
                    return existing;
                })
                .orElseGet(() -> {
                    log.info("새로운 구독 정보 저장");
                    return new AlarmSubscriptionEntity(user, subscriptionJson);
                });

        alarmSubscriptionRepository.save(alarmSubscription);
        log.info("구독 정보 저장 완료");
    }




}