package rocket.jobrocketbackend.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
    //TODO 추후에 userId -> User로 고칠것
    List<ScheduleEntity> findByUserId(Long userId);
}
