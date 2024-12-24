package rocket.jobrocketbackend.schedule.controller.request;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ScheduleCreateRequest {

    private String title;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    private String memo;
    private String state;

    public ScheduleCreateDTO toCreateDTO(){
        return ScheduleCreateDTO.builder()
                .title(this.getTitle())
                .dueDate(this.getDueDate())
                .memo(this.getMemo())
                .state(this.getState()).build();
    }
}
