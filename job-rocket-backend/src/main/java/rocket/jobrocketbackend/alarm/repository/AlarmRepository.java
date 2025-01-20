package rocket.jobrocketbackend.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rocket.jobrocketbackend.alarm.entity.AlarmEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmRepository extends JpaRepository<AlarmEntity, Long> {


    List<AlarmEntity> findByUserId(Long memberId);
}
