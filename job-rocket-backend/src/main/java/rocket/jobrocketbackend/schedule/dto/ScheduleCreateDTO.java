package rocket.jobrocketbackend.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

import java.time.LocalDate;

@AllArgsConstructor
@Builder
@Getter
public class ScheduleCreateDTO {

    private String title;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    private String memo;
    private String state;

    public ScheduleEntity toCreateEntity(){
        return ScheduleEntity.builder()
                .title(this.getTitle())
                .type(ScheduleType.Document)
                .dueDate(this.getDueDate())
                .memo(this.getMemo())
                .userId(1L)
                .state(ScheduleState.from(this.getState()))
                .build();
    }
}
