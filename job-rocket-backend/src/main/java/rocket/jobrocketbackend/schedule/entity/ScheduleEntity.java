package rocket.jobrocketbackend.schedule.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleModifyDTO;
import rocket.jobrocketbackend.member.entity.MemberEntity;

import java.time.LocalDate;

@Entity(name = "schedule")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    private String title;
    private LocalDate dueDate;
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity user;

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

    public static ScheduleEntity create(ScheduleCreateDTO dto, MemberEntity user) {
        return ScheduleEntity.builder()
                .title(dto.getTitle())
                .user(user)
                .type(ScheduleType.Document)
                .dueDate(dto.getDueDate())
                .memo(dto.getMemo())
                .state(ScheduleState.from(dto.getState()))
                .build();
    }
}
