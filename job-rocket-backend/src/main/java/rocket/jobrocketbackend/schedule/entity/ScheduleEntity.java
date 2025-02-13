package rocket.jobrocketbackend.schedule.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleModifyDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleRateDto;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

@SqlResultSetMapping(
        name = "ScheduleRateMapping",
        classes = @ConstructorResult(
                targetClass = ScheduleRateDto.class,
                columns = {
                        @ColumnResult(name = "documentPassRate", type = Long.class),
                        @ColumnResult(name = "firstPassRate", type = Long.class),
                        @ColumnResult(name = "secondPassRate", type = Long.class),
                        @ColumnResult(name = "finalPassRate", type = Long.class)
                }
        )
)
@NamedNativeQuery(
        name = "Schedule.findScheduleRateByMemberId",
        query = "SELECT " +
                "IFNULL(CAST(ROUND(1.0 * SUM(CASE WHEN (type = 'DOCUMENT' AND state = 'PASSED') OR (type IN ('FIRST','SECOND','FINAL')) THEN 1 ELSE 0 END) / " +
                "NULLIF(SUM(CASE WHEN (type = 'DOCUMENT' AND state <> 'ONGOING') OR (type IN ('FIRST','SECOND','FINAL')) THEN 1 ELSE 0 END), 0) * 100, 0) AS SIGNED), 0) AS documentPassRate, " +
                "IFNULL(CAST(ROUND(1.0 * SUM(CASE WHEN (type = 'FIRST' AND state = 'PASSED') OR (type IN ('SECOND','FINAL')) THEN 1 ELSE 0 END) / " +
                "NULLIF(SUM(CASE WHEN (type = 'FIRST' AND state <> 'ONGOING') OR (type IN ('SECOND','FINAL')) THEN 1 ELSE 0 END), 0) * 100, 0) AS SIGNED), 0) AS firstPassRate, " +
                "IFNULL(CAST(ROUND(1.0 * SUM(CASE WHEN (type = 'SECOND' AND state = 'PASSED') OR (type = 'FINAL') THEN 1 ELSE 0 END) / " +
                "NULLIF(SUM(CASE WHEN (type = 'SECOND' AND state <> 'ONGOING') OR (type = 'FINAL') THEN 1 ELSE 0 END), 0) * 100, 0) AS SIGNED), 0) AS secondPassRate, " +
                "IFNULL(CAST(ROUND(1.0 * SUM(CASE WHEN type = 'FINAL' AND state = 'PASSED' THEN 1 ELSE 0 END) / " +
                "NULLIF(SUM(CASE WHEN type = 'FINAL' AND state <> 'ONGOING' THEN 1 ELSE 0 END), 0) * 100, 0) AS SIGNED), 0) AS finalPassRate " +
                "FROM schedule " +
                "WHERE member_id = :userId",
        resultSetMapping = "ScheduleRateMapping"
)
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
    private UserEntity user;

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

    public static ScheduleEntity create(ScheduleCreateDTO dto, UserEntity user) {
        return ScheduleEntity.builder()
                .title(dto.getTitle())
                .user(user)
                .type(ScheduleType.DOCUMENT)
                .dueDate(dto.getDueDate())
                .memo(dto.getMemo())
                .state(ScheduleState.from(dto.getState()))
                .type(ScheduleType.from(dto.getType()))
                .build();
    }
}
