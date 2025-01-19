package rocket.jobrocketbackend.schedule.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleModifyTypeRequest;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.exception.IllegalScheduleStateException;
import rocket.jobrocketbackend.schedule.exception.IllegalScheduleTypeException;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ScheduleEntityTest {

    @Test
    @DisplayName("ScheduleCreateDTO에 유효하지 않은 state를 넣으면 예외를 발생시킨다.")
    void toNewScheduleEntityThrowException() {
        //given
        ScheduleCreateDTO dto = ScheduleCreateDTO.builder().memo("메모입니다")
                .title("제목입니다")
                .state("ongoing")
                .dueDate(LocalDate.of(2024, 12, 23))
                .build();
        //when
        //then
        assertThatThrownBy(() -> ScheduleEntity.create(dto,new UserEntity()))
                .isInstanceOf(IllegalScheduleStateException.class)
                .hasMessage("잘못된 상태 값입니다.");
    }
    @Test
    @DisplayName("ScheduleType에 유효하지 않은 state를 넣으면 예외를 발생시킨다.")
    void toNewScheduleEntityTypeThrowException() {
        //given
        ScheduleModifyTypeRequest request = ScheduleModifyTypeRequest.builder().scheduleId(1L).type("3차면접").build();
        //when
        //then
        assertThatThrownBy(request::toTypeModifyDto)
                .isInstanceOf(IllegalScheduleTypeException.class)
                .hasMessage("잘못된 타입 값입니다.");
    }
}