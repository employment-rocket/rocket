package rocket.jobrocketbackend.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;

import java.util.List;

public interface AnswerJpaRepository extends JpaRepository<AnswerEntity, Long> {
    @Query("SELECT a FROM AnswerEntity a WHERE a.memberId = :memberId AND a.category = :category AND a.isIn = :isIn")
    List<AnswerEntity> findByMemberIdAndCategoryAndIsIn(@Param("memberId") Long memberId,
                                                        @Param("category") String category,
                                                        @Param("isIn") boolean isIn);

    AnswerEntity findByMemberIdAndCategoryAndQid(Long memberId, String category, Long qid);
}
