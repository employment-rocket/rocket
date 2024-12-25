package rocket.jobrocketbackend.schedule.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleModifyDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ScheduleModifyRequest {

    @NotBlank(message = "제목은 공백일 수 없습니다.")
    private String title;

    private String memo;

    @NotNull(message = "날짜는 필수 값 입니다.")
    private LocalDate dueDate;

    @NotNull(message = "상태는 필수 값 입니다.")
    private String state; // 진행중, 탈락, 최종합격

    public ScheduleModifyDTO toModifyDto(Long scheduleId) {
        return ScheduleModifyDTO.builder()
                .id(scheduleId)
                .dueDate(this.dueDate)
                .title(this.title)
                .memo(this.memo)
                .state(ScheduleState.from(this.getState()))
                .build();

    }
}
