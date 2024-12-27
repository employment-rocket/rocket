package rocket.jobrocketbackend.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

@AllArgsConstructor
@Builder
@Getter
public class ScheduleTypeModifyDTO {
    private Long scheduleId;
    private ScheduleType type;
}
