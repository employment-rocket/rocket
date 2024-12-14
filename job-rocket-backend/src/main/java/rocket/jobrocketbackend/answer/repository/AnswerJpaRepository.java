package rocket.jobrocketbackend.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;

import java.util.List;

public interface AnswerJpaRepository extends JpaRepository<AnswerEntity, Long> {
    List<AnswerEntity> findByMemberIdAndCategoryAndIsIn(Long memberId, String category, boolean isIn);
    AnswerEntity findByMemberIdAndCategoryAndQid(Long memberId, String category, Long qid);
}