package rocket.jobrocketbackend.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleCreateRequest;

import java.time.LocalDate;

@AllArgsConstructor
@Builder
@Getter
public class ScheduleDTO {

    private String title;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    private String memo;
    private String state;

    public static ScheduleDTO from(ScheduleCreateRequest request){
        return ScheduleDTO.builder()
                .title(request.getTitle())
                .dueDate(request.getDueDate())
                .memo(request.getMemo())
                .state(request.getState()).build();
    }
}
