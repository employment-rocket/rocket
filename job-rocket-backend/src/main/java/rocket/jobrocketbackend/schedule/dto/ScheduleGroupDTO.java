package rocket.jobrocketbackend.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleGroupDTO {
    ScheduleType key;
    int count;

    public ScheduleGroupDTO(ScheduleType key, int count) {
        this.key = key;
        this.count = count;
    }
}
