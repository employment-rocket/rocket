package rocket.jobrocketbackend.schedule.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

import java.time.LocalDate;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


class ScheduleDTOTest {

    @Test
    @DisplayName("ScheduleDTO를 새로운 일정 엔티티로 변환")
    void toNewScheduleEntity(){
        //given
        ScheduleDTO dto = ScheduleDTO.builder().memo("메모입니다")
                .title("제목입니다")
                .state("진행중")
                .dueDate(LocalDate.of(2024, 12, 23))
                .build();
        //when
        ScheduleEntity newScheduleEntity = dto.toNewScheduleEntity();
        //then
        assertThat(newScheduleEntity.getTitle()).isEqualTo("제목입니다");
        assertThat(newScheduleEntity.getMemo()).isEqualTo("메모입니다");
        assertThat(newScheduleEntity.getDueDate()).isEqualTo(LocalDate.of(2024,12,23));
        assertThat(newScheduleEntity.getType()).isEqualTo(ScheduleType.Document);
        assertThat(newScheduleEntity.getState()).isEqualTo(ScheduleState.Ongoing);
    }
}