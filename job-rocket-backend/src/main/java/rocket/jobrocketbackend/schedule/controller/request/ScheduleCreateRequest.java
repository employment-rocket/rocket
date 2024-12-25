package rocket.jobrocketbackend.schedule.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ScheduleCreateRequest {

    @NotBlank(message = "제목은 공백일 수 없습니다.")
    private String title;

    @NotNull(message = "날짜값은 필수 입니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    private String memo;

    @NotNull(message = "상태값은 필수 입니다.")
    private String state;

    public ScheduleCreateDTO toCreateDTO(){
        return ScheduleCreateDTO.builder()
                .title(this.getTitle())
                .dueDate(this.getDueDate())
                .memo(this.getMemo())
                .state(this.getState()).build();
    }
}
