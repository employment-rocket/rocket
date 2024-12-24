package rocket.jobrocketbackend.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@Builder
public class ScheduleModifyDTO {
    private Long id;
    private String title;
    private LocalDate dueDate;
    private String memo;
    private ScheduleState state;

}
