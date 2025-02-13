package rocket.jobrocketbackend.schedule.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class ScheduleRateDto {

    private long documentPassRate;
    private long firstPassRate;
    private long secondPassRate;
    private long finalPassRate;

}
