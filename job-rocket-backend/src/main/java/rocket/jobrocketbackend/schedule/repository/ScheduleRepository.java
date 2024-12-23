package rocket.jobrocketbackend.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
}
