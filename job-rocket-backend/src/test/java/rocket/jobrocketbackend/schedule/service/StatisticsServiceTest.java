package rocket.jobrocketbackend.schedule.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class StatisticsServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private StatisticsService statisticsService;

    private Long userId;

    @BeforeEach
    void init() {
        LocalDate date = LocalDate.of(2024, 12, 23);
        UserEntity user = UserEntity.builder().email("test@naver.com").allowEmail(false).allowAlarm(false).role(Role.MEMBER).nickname("test").build();
        userRepository.save(user);
        userId = user.getId();
        ScheduleEntity entity1 = ScheduleEntity.builder().title("제목1").memo("메모1").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).user(user).build();
        ScheduleEntity entity2 = ScheduleEntity.builder().title("제목2").memo("메모2").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).user(user).build();
        ScheduleEntity entity3 = ScheduleEntity.builder().title("제목3").memo("메모3").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).user(user).build();
        ScheduleEntity entity4 = ScheduleEntity.builder().title("제목4").memo("메모4").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.First).user(user).build();
        ScheduleEntity entity5 = ScheduleEntity.builder().title("제목5").memo("메모5").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.First).user(user).build();
        ScheduleEntity entity6 = ScheduleEntity.builder().title("제목6").memo("메모6").dueDate(date).state(ScheduleState.Passed).type(ScheduleType.Second).user(user).build();
        ScheduleEntity entity7 = ScheduleEntity.builder().title("제목7").memo("메모7").dueDate(date).state(ScheduleState.Fail).type(ScheduleType.Final).user(user).build();

        scheduleRepository.save(entity1);
        scheduleRepository.save(entity2);
        scheduleRepository.save(entity3);
        scheduleRepository.save(entity4);
        scheduleRepository.save(entity5);
        scheduleRepository.save(entity6);
        scheduleRepository.save(entity7);
    }

    @DisplayName("유저정보에 해당하는 일정관리를 타입과 상태별 개수를 담은 map 반환")
    @Test
    void getStatisticsByStateAndType() {
        //given
        //when
        Map<String, Long> result = statisticsService.getStatisticsByStateAndType(userId);
        //then
        assertThat(result).hasSize(7).
                containsEntry(ScheduleType.Document.name(), 3L).
                containsEntry(ScheduleType.First.name(), 2L).
                containsEntry(ScheduleType.Second.name(), 1L).
                containsEntry(ScheduleType.Final.name(), 1L).
                containsEntry(ScheduleState.Passed.name(), 1L).
                containsEntry(ScheduleState.Fail.name(), 1L)
                .containsEntry(ScheduleState.Ongoing.name(), 5L);
    }
}