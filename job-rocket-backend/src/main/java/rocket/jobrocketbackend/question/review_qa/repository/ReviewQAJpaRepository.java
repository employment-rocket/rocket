package rocket.jobrocketbackend.question.review_qa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.question.review_qa.entity.ReviewQAEntity;

import java.util.List;

public interface ReviewQAJpaRepository extends JpaRepository<ReviewQAEntity, Long> {

    List<ReviewQAEntity> findBySchedule_Id(Long scheduleId);

    @Transactional
    @Modifying
    @Query("DELETE FROM ReviewQAEntity r WHERE r.schedule.id = :scheduleId")
    void deleteBySchedule_Id(Long scheduleId);
}
