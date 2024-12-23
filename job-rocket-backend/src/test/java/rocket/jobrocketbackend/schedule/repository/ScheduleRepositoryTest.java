package rocket.jobrocketbackend.schedule.repository;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@Transactional
class ScheduleRepositoryTest {

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private EntityManager em;

    @DisplayName("새로운 ScheduleEntity를 DB에 저장한다.")
    @Test
    void createScheduleEntity(){
        //given
        ScheduleEntity newSchedule = ScheduleEntity.builder()
                .title("삼성전자")
                .userId(1L)
                .state(ScheduleState.Ongoing)
                .memo("메모입니다.")
                .type(ScheduleType.Document)
                .dueDate(LocalDate.of(2024, 12, 23))
                .build();

        //when
        scheduleRepository.save(newSchedule);
        Long id = newSchedule.getId();
        em.clear();
        ScheduleEntity result = scheduleRepository.findById(id).get();

        //then
        assertThat(result).isNotNull();
        assertThat(result.getTitle()).isEqualTo("삼성전자");
        assertThat(result.getMemo()).isEqualTo("메모입니다.");
        assertThat(result.getDueDate()).isEqualTo(LocalDate.of(2024,12,23));
        assertThat(result.getType()).isEqualTo(ScheduleType.Document);
        assertThat(result.getState()).isEqualTo(ScheduleState.Ongoing);
        assertThat(result.getId()).isEqualTo(id);
    }

}