package rocket.jobrocketbackend.question.cs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;

public interface CsRepository extends JpaRepository<CsEntity, Long> {
}
