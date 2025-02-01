package rocket.jobrocketbackend.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import rocket.jobrocketbackend.alarm.entity.AlarmEntity;
import rocket.jobrocketbackend.common.entity.AlarmType;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

import java.time.LocalDate;


@Getter
@AllArgsConstructor
@Builder
public class AlarmDTO {
    private Long id;
    private AlarmType alarmType;
    private String content;
    private LocalDate alarmDate;

    public static AlarmDTO from(AlarmEntity entity){
        return AlarmDTO.builder()
                .id(entity.getId())
                .alarmType(entity.getType())
                .content(entity.getContent())
                .alarmDate(entity.getAlarmDate())
                .build();
    }

}



