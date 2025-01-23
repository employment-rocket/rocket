package rocket.jobrocketbackend.schedule.repository;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

@DataJpaTest
@ActiveProfiles("test")
@Transactional
class ScheduleRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private EntityManager em;

    private Long userId;

    @BeforeEach
    void init(){
        LocalDate date = LocalDate.of(2024, 12, 23);
        UserEntity user = UserEntity.builder().email("test@naver.com").allowEmail(false).allowAlarm(false).role(Role.MEMBER).nickname("test").build();
        userRepository.save(user);
        userId = user.getId();
        ScheduleEntity entity1 = ScheduleEntity.builder().title("제목1").memo("메모1").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).user(user).build();
        ScheduleEntity entity2 = ScheduleEntity.builder().title("제목2").memo("메모2").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).user(user).build();
        ScheduleEntity entity3 = ScheduleEntity.builder().title("제목3").memo("메모3").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.Document).user(user).build();
        ScheduleEntity entity4 = ScheduleEntity.builder().title("제목4").memo("메모4").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.First).user(user).build();
        ScheduleEntity entity5 = ScheduleEntity.builder().title("제목5").memo("메모5").dueDate(date).state(ScheduleState.Ongoing).type(ScheduleType.First).user(user).build();
        ScheduleEntity entity6 = ScheduleEntity.builder().title("제목6").memo("메모6").dueDate(date).state(ScheduleState.Passed).type(ScheduleType.Second).user(user).build();
        ScheduleEntity entity7 = ScheduleEntity.builder().title("제목7").memo("메모7").dueDate(date).state(ScheduleState.Fail).type(ScheduleType.Final).user(user).build();

        scheduleRepository.save(entity1);
        scheduleRepository.save(entity2);
        scheduleRepository.save(entity3);
        scheduleRepository.save(entity4);
        scheduleRepository.save(entity5);
        scheduleRepository.save(entity6);
        scheduleRepository.save(entity7);
    }

    @DisplayName("새로운 ScheduleEntity를 DB에 저장한다.")
    @Test
    void createScheduleEntity(){
        //given
        UserEntity user = UserEntity.builder().nickname("test").role(Role.MEMBER).allowAlarm(false).allowEmail(false).build();
        userRepository.save(user);
        ScheduleEntity newSchedule = ScheduleEntity.builder()
                .title("삼성전자")
                .user(user)
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

    @Test
    @DisplayName("userID를 가지고 해당 유저가 가지고 있는 모든 일정관리 리스트를 반환")
    void findByUserId(){
        //given
        UserEntity user = userRepository.findByEmail("test@naver.com").get();
        //when
        List<ScheduleEntity> list = scheduleRepository.findByUser(user);
        //then
        assertThat(list).hasSize(7);
    }
    @Test
    @DisplayName("scheduleId에 해당하는 schdeule를 삭제한다.")
    void deleteById() {
        // given
        UserEntity user = UserEntity.builder().nickname("test").role(Role.MEMBER).allowAlarm(false).allowEmail(false).build();
        userRepository.save(user);
        ScheduleEntity entity = ScheduleEntity.builder().title("test").memo("test").dueDate(LocalDate.of(2024,12,11)).state(ScheduleState.Ongoing).type(ScheduleType.Final).user(user).build();
        scheduleRepository.save(entity);
        List<ScheduleEntity> list = scheduleRepository.findAll();
        int count = list.size();
        ScheduleEntity schedule = list.get(0);
        // when
        scheduleRepository.deleteById(schedule.getId());
        list = scheduleRepository.findAll();
        // then
        assertThat(list).hasSize(count - 1);
    }

    @Test
    @DisplayName("해당 유저에 진행중 상태인 Schedule를 가져온다.")
    void findByUserAndIsNotFail() {
        // given
        UserEntity user = userRepository.findById(userId).get();
        // when
        List<ScheduleEntity> result = scheduleRepository.findByUserAndIsNotFail(user);
        // then
        assertThat(result).hasSize(5);
    }

    @Test
    @DisplayName("해당 유저가 가지고있는 일정관리를 ScheduleType 당 몇개가있는지 반환")
    void findByUserAndGroupByType() {
        // given
        UserEntity user = userRepository.findById(userId).get();
        // when
        List<ScheduleGroupDTO> result = scheduleRepository.findByUserAndGroupByType(user);
        // then
        assertThat(result).hasSize(4)
                .extracting("key","count")
                .containsExactlyInAnyOrder(
                        tuple(ScheduleType.Document.name(),3L),
                        tuple(ScheduleType.First.name(),2L),
                        tuple(ScheduleType.Second.name(),1L),
                        tuple(ScheduleType.Final.name(),1L)
                );
    }
    @Test
    @DisplayName("해당 유저가 가지고있는 일정관리를 ScheduleState 당 몇개가있는지 반환")
    void findByUserAndGroupByState() {
        // given
        UserEntity user = userRepository.findById(userId).get();
        // when
        List<ScheduleGroupDTO> result = scheduleRepository.findByUserAndGroupByState(user);
        // then
        assertThat(result).hasSize(3)
                .extracting("key","count")
                .containsExactlyInAnyOrder(
                        tuple(ScheduleState.Ongoing.name(),5L),
                        tuple(ScheduleState.Fail.name(),1L),
                        tuple(ScheduleState.Passed.name(),1L)
                );
    }

    @Test
    @DisplayName("해당 유저의 타입이 서류이고 상태가 탈락인 개수를 가져온다.")
    void findByUserAndTypeDocumentAndStateFailCount() {
        // given
        UserEntity user = userRepository.findById(userId).get();
        LocalDate date = LocalDate.of(2025, 01, 05);
        ScheduleEntity entity = ScheduleEntity.builder().title("제목1").memo("메모1").dueDate(date).state(ScheduleState.Fail).type(ScheduleType.Document).user(user).build();
        ScheduleEntity entity2 = ScheduleEntity.builder().title("제목2").memo("메모2").dueDate(date).state(ScheduleState.Fail).type(ScheduleType.Document).user(user).build();
        scheduleRepository.save(entity);
        // when
        Long result = scheduleRepository.findByUserAndTypeDocumentAndStateFailCount(user);
        // then
        assertThat(result).isEqualTo(1);
    }
}