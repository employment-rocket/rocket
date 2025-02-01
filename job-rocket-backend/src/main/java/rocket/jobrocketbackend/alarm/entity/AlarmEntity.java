package rocket.jobrocketbackend.alarm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.common.entity.AlarmType;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

@Entity(name = "alarm")
@NoArgsConstructor
@Getter
public class AlarmEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate alarmDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    private AlarmType type;

    @Builder
    public AlarmEntity(Long id, String content, LocalDate alarmDate, UserEntity user, AlarmType type){
        this.id=id;
        this.content=content;
        this.alarmDate=alarmDate;
        this.user=user;
        this.type=type;
    }

}
