package rocket.jobrocketbackend.schedule.controller.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;

import java.time.LocalDate;

@Builder
@Getter
public class ScheduleResponse {
    private long id;
    private String title;
    private String memo;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate dueDate;
    private String type;
    private String state; // 진행중, 탈락, 최종합격

    public static ScheduleResponse from(ScheduleDTO dto){
        return ScheduleResponse.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .memo(dto.getMemo())
                .dueDate(dto.getDueDate())
                .type(dto.getType().getText())
                .state(dto.getState().getText())
                .build();
    }
}
