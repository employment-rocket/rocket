package rocket.jobrocketbackend.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.alarm.entity.AlarmSubscriptionEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.util.Optional;

public interface AlarmSubscriptionRepository extends JpaRepository<AlarmSubscriptionEntity, Long> {
    Optional<AlarmSubscriptionEntity> findByUserId(Long memberId);
}
