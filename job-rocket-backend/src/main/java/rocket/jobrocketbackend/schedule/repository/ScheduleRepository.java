package rocket.jobrocketbackend.schedule.repository;

import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.User;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
    List<ScheduleEntity> findByUser(UserEntity user);

    @Query("SELECT s FROM SCHEDULE s WHERE s.user = :user " +
            "and s.state = rocket.jobrocketbackend.schedule.entity.ScheduleState.Ongoing")
    List<ScheduleEntity> findByUserAndIsNotFail(@Param("user") UserEntity user);

    @Query("select new rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO(s.type,count(s)) " +
            "from SCHEDULE s where s.user = :user group by s.type")
    List<ScheduleGroupDTO> findByUserAndGroupByType(@Param("user") UserEntity user);

    @Query("select new rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO(s.state,count(s)) " +
            "from SCHEDULE s where s.user = :user group by s.state")
    List<ScheduleGroupDTO> findByUserAndGroupByState(@Param("user") UserEntity user);
}
