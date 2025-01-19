package rocket.jobrocketbackend.introduce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;

import java.util.List;
import java.util.Optional;

public interface IntroduceJpaRepository extends JpaRepository<IntroduceEntity, Long> {
    List<IntroduceEntity> findByMemberId(Long memberId);
}