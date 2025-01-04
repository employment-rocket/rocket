package rocket.jobrocketbackend.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
    List<ScheduleEntity> findByUser(UserEntity user);

    @Query("SELECT s FROM SCHEDULE s WHERE s.user = :user " +
            "and s.state = rocket.jobrocketbackend.schedule.entity.ScheduleState.Ongoing")
    List<ScheduleEntity> findByUserAndIsNotFail(@Param("user") UserEntity user);
}
