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
public class ScheduleDTO {
    private Long id;
    private String title;
    private LocalDate dueDate;
    private String memo;
    private ScheduleType type;
    private ScheduleState state;

    public static ScheduleDTO from(ScheduleEntity entity){
        return ScheduleDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .memo(entity.getMemo())
                .dueDate(entity.getDueDate())
                .state(entity.getState())
                .type(entity.getType())
                .build();
    }
}
