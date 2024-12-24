package rocket.jobrocketbackend.schedule.controller.request;

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
    private String title;
    private String memo;
    private LocalDate dueDate;
    private String state; // 진행중, 탈락, 최종합격

    public ScheduleModifyDTO toModifyDto(Long scheduleId){
        return ScheduleModifyDTO.builder()
                .id(scheduleId)
                .dueDate(this.dueDate)
                .title(this.title)
                .memo(this.memo)
                .state(ScheduleState.from(this.getState()))
                .build();

    }
}
