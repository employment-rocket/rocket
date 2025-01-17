package rocket.jobrocketbackend.question.introduce_qa.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;

import java.util.List;

public interface IntroduceQAJpaRepository extends JpaRepository<IntroduceQAEntity, Long> {
    List<IntroduceQAEntity> findByIntroduce_IntroduceId(Long introduceId);

    @Transactional
    @Modifying
    @Query("DELETE FROM IntroduceQAEntity q WHERE q.introduce.introduceId = :introduceId")
    void deleteByIntroduceId(Long introduceId);
}
