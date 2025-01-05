package rocket.jobrocketbackend.schedule.dto;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ScheduleGroupDTO {
    String key;
    Long count;

    public ScheduleGroupDTO(ScheduleType type, Long count) {
        this.key = type.getText();
        this.count = count;
    }
    public ScheduleGroupDTO(ScheduleState state, Long count) {
        this.key = state.getText();
        this.count = count;
    }
}
