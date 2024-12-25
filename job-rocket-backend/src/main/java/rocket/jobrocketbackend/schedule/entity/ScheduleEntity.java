package rocket.jobrocketbackend.schedule.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.schedule.dto.ScheduleModifyDTO;

import java.time.LocalDate;

@Entity(name = "SCHEDULE")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private LocalDate dueDate;
    private String memo;
    /*
    @ManyToOne(fetch = FetchType.Lazy)
    @JoinColumn(name = "user_id")
    private User user;
    */
    private Long userId;

    @Enumerated(EnumType.STRING)
    private ScheduleType type;

    @Enumerated(EnumType.STRING)
    private ScheduleState state;

    public void modifyType(ScheduleType type){
        this.type = type;
    }
    public void modify(ScheduleModifyDTO dto){
        this.title = dto.getTitle();
        this.dueDate = dto.getDueDate();
        this.memo = dto.getMemo();
        this.state = dto.getState();
    }
}
