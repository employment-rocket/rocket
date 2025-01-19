package rocket.jobrocketbackend.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface AnswerJpaRepository extends JpaRepository<AnswerEntity, Long> {
    @Query("SELECT a FROM AnswerEntity a WHERE a.member.id = :memberId AND a.category = :category AND a.isIn = :isIn")
    List<AnswerEntity> findByMemberIdAndCategoryAndIsIn(@Param("memberId") Long memberId,
                                                        @Param("category") Category category,
                                                        @Param("isIn") boolean isIn);

    AnswerEntity findByMemberAndCategoryAndQid(UserEntity member, Category category, Long qid);

    Optional<AnswerEntity> findByMemberIdAndCategoryAndQid(Long memberId, Category category, Long qid);
}
