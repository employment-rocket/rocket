package rocket.jobrocketbackend.schedule.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest

@ActiveProfiles("test")
@Transactional
class ScheduleServiceTest {

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private ScheduleService scheduleService;

    @BeforeEach
    void init(){
        //TODO userId 추후에 User로변경하기
        LocalDate date = LocalDate.of(2024, 12, 23);
        ScheduleEntity entity1 = ScheduleEntity.builder().title("제목1").memo("메모1").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).userId(1L).build();
        ScheduleEntity entity2 = ScheduleEntity.builder().title("제목2").memo("메모2").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).userId(1L).build();
        ScheduleEntity entity3 = ScheduleEntity.builder().title("제목3").memo("메모3").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).userId(1L).build();
        ScheduleEntity entity4 = ScheduleEntity.builder().title("제목4").memo("메모4").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.First).userId(1L).build();
        ScheduleEntity entity5 = ScheduleEntity.builder().title("제목5").memo("메모5").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.First).userId(1L).build();
        ScheduleEntity entity6 = ScheduleEntity.builder().title("제목6").memo("메모6").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Second).userId(1L).build();
        ScheduleEntity entity7 = ScheduleEntity.builder().title("제목7").memo("메모7").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Final).userId(1L).build();

        scheduleRepository.save(entity1);
        scheduleRepository.save(entity2);
        scheduleRepository.save(entity3);
        scheduleRepository.save(entity4);
        scheduleRepository.save(entity5);
        scheduleRepository.save(entity6);
        scheduleRepository.save(entity7);
    }

    @Test
    @DisplayName("사용자 정보에 해당하는 일정관리를 map<type, dto> 형태로 반환")
    void getScheduleList(){
        //given
        //when
        Map<String, List<ScheduleDTO>> scheduleList = scheduleService.getScheduleList(1L);
        List<ScheduleDTO> documentList = scheduleList.get(ScheduleType.Document.name());
        List<ScheduleDTO> firstList = scheduleList.get(ScheduleType.First.name());
        List<ScheduleDTO> secondeList = scheduleList.get(ScheduleType.Second.name());
        List<ScheduleDTO> finalList = scheduleList.get(ScheduleType.Final.name());
        //then
        assertThat(documentList).hasSize(3);
        assertThat(firstList).hasSize(2);
        assertThat(secondeList).hasSize(1);
        assertThat(finalList).hasSize(1);

    }
}