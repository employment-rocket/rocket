package rocket.jobrocketbackend.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.user.entity.UserEntity;

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
    private Long userId;

    public ScheduleEntity toCreateEntity(UserEntity user){
        return ScheduleEntity.builder()
                .title(this.getTitle())
                .type(ScheduleType.Document)
                .dueDate(this.getDueDate())
                .memo(this.getMemo())
                .user(user)
                .state(ScheduleState.from(this.getState()))
                .build();
    }

    public void setUserId(Long userId){
        this.userId = userId;
    }
}
