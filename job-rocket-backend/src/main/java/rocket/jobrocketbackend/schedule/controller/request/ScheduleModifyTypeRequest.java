package rocket.jobrocketbackend.schedule.controller.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.schedule.dto.ScheduleTypeModifyDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleModifyTypeRequest {
    private Long scheduleId;
    private String type;

    public ScheduleTypeModifyDTO toTypeModifyDto(){
        return ScheduleTypeModifyDTO.builder()
                .scheduleId(this.scheduleId)
                .type(ScheduleType.from(this.type))
                .build();
    }
}
