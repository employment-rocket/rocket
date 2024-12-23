package rocket.jobrocketbackend.schedule.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

import java.time.LocalDate;
import static org.assertj.core.api.Assertions.assertThat;


class ScheduleDTOTest {

    @Test
    @DisplayName("ScheduleCreateDTO를 새로운 일정 엔티티로 변환")
    void toNewScheduleEntity() {
        //given
        ScheduleCreateDTO dto = ScheduleCreateDTO.builder().memo("메모입니다")
                .title("제목입니다")
                .state("Ongoing")
                .dueDate(LocalDate.of(2024, 12, 23))
                .build();
        //when
        ScheduleEntity newScheduleEntity = dto.toNewScheduleEntity();
        //then
        assertThat(newScheduleEntity.getTitle()).isEqualTo("제목입니다");
        assertThat(newScheduleEntity.getMemo()).isEqualTo("메모입니다");
        assertThat(newScheduleEntity.getDueDate()).isEqualTo(LocalDate.of(2024, 12, 23));
        assertThat(newScheduleEntity.getType()).isEqualTo(ScheduleType.Document);
        assertThat(newScheduleEntity.getState()).isEqualTo(ScheduleState.Ongoing);
    }

    @Test
    @DisplayName("ScheduleEntity를 ScheduleDTO로 변환")
    void scheduleDtoFromScheduleEntity(){
        //given
        ScheduleEntity entity = ScheduleEntity.builder()
                .id(1L)
                .dueDate(LocalDate.of(2024, 12, 23))
                .type(ScheduleType.Document)
                .state(ScheduleState.Ongoing)
                .memo("메모입니다")
                .title("제목입니다.")
                .build();
        //when
        ScheduleDTO from = ScheduleDTO.from(entity);
        //then
        assertThat(from.getTitle()).isEqualTo(entity.getTitle());
        assertThat(from.getId()).isEqualTo(entity.getId());
        assertThat(from.getMemo()).isEqualTo(entity.getMemo());
        assertThat(from.getDueDate()).isEqualTo(entity.getDueDate());
        assertThat(from.getType()).isEqualTo(entity.getType());
        assertThat(from.getState()).isEqualTo(entity.getState());
    }
}