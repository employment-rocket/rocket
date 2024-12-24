package rocket.jobrocketbackend.schedule.controller.request;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class ScheduleCreateRequest {

    private String title;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    private String memo;
    private String state;
}
