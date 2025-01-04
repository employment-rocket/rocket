package rocket.jobrocketbackend.question.introduce_qa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;

import java.util.List;

public interface IntroduceQAJpaRepository extends JpaRepository<IntroduceQAEntity, Long> {
    List<IntroduceQAEntity> findByIntroduce_IntroduceId(Long introduceId);
}
