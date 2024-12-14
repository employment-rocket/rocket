package rocket.jobrocketbackend.question.personal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.question.personal.entity.PersonalEntity;

public interface PersonalRepository extends JpaRepository<PersonalEntity, Long> {
}
