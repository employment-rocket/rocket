package rocket.jobrocketbackend.schedule.controller.request;

import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "id는필수 값 입니다.")
    private Long scheduleId;

    @NotNull(message = "Type은 필수 값 입니다.")
    private String type;

    public ScheduleTypeModifyDTO toTypeModifyDto(){
        return ScheduleTypeModifyDTO.builder()
                .scheduleId(this.scheduleId)
                .type(ScheduleType.from(this.type))
                .build();
    }
}
