package rocket.jobrocketbackend.schedule.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleTypeModifyDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.exception.IllegalScheduleStateException;
import rocket.jobrocketbackend.schedule.exception.ScheduleNotFoundException;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest

@ActiveProfiles("test")
@Transactional
class ScheduleServiceTest {

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private ScheduleService scheduleService;

    @BeforeEach
    void init() {
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
    void getScheduleList() {
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

    @Test
    @DisplayName("새로운 일정관리 생성")
    void create() {
        //given
        ScheduleCreateDTO dto = ScheduleCreateDTO.builder()
                .title("제목")
                .memo("내용")
                .state("Ongoing")
                .dueDate(LocalDate.of(2024, 03, 21))
                .build();
        //when
        ScheduleDTO result = scheduleService.create(dto);
        //then
        assertThat(result.getState()).isEqualTo(ScheduleState.from(dto.getState()));
        assertThat(result.getType()).isEqualTo(ScheduleType.Document);
        assertThat(result.getTitle()).isEqualTo(dto.getTitle());
        assertThat(result.getMemo()).isEqualTo(dto.getMemo());
        assertThat(result.getDueDate()).isEqualTo(dto.getDueDate());
    }

    @Test
    @DisplayName("새로운 일정관리 생성시 상태값이 이상하면 예외를 던진다.")
    void createException() {
        //given
        ScheduleCreateDTO dto = ScheduleCreateDTO.builder()
                .title("제목")
                .memo("내용")
                .state("ongoing")
                .dueDate(LocalDate.of(2024, 03, 21))
                .build();
        //when
        //then
        assertThatThrownBy(() -> scheduleService.create(dto))
                .isInstanceOf(IllegalScheduleStateException.class)
                .hasMessage("잘못된 상태 값입니다.");
    }

    @Test
    @DisplayName("입력받은 id와 타입으로 해당하는 일정관리의 타입을 변경한다.")
    void modifyType() {
        //given
        LocalDate date = LocalDate.of(2024, 12, 22);
        ScheduleEntity entity = ScheduleEntity.builder().title("test").memo("test").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Final).userId(1L).build();
        scheduleRepository.save(entity);
        //when
        ScheduleTypeModifyDTO dto = ScheduleTypeModifyDTO.builder().scheduleId(entity.getId()).type(ScheduleType.Final).build();
        ScheduleDTO result = scheduleService.modifyType(dto);
        //then
        assertThat(result.getId()).isEqualTo(entity.getId());
        assertThat(result.getType()).isEqualTo(ScheduleType.Final);
    }

    @Test
    @DisplayName("입력받은 id와 타입으로 해당하는 일정관리의 타입을 변경한지만 일치하는id가 없으면 예외를 던진다.")
    void modifyTypeException() {
        //given
        ScheduleTypeModifyDTO dto = ScheduleTypeModifyDTO.builder().scheduleId(123459L).type(ScheduleType.Final).build();
        //when
        //then
        assertThatThrownBy(() -> scheduleService.modifyType(dto))
                .isInstanceOf(ScheduleNotFoundException.class)
                .hasMessage("해당하는 일정을 찾을 수 없습니다.");
    }

    @Test
    @DisplayName("scheduleId에 해당하는 schdeule를 삭제한다.")
    void delete() {
        // given
        ScheduleEntity entity = ScheduleEntity.builder().title("test").memo("test").dueDate(LocalDate.of(2024,12,11)).state(ScheduleState.Ongoing).type(ScheduleType.Final).userId(1L).build();
        scheduleRepository.save(entity);
        List<ScheduleEntity> list = scheduleRepository.findAll();
        int count = list.size();
        ScheduleEntity schedule = list.get(0);
        // when
        scheduleService.delete(schedule.getId());
        list = scheduleRepository.findAll();
        // then
        assertThat(list).hasSize(count - 1);
    }
}