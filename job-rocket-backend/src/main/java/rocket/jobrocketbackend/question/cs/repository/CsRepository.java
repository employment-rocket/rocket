package rocket.jobrocketbackend.question.cs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;

import java.util.List;

public interface CsRepository extends JpaRepository<CsEntity, Long> {
    List<CsEntity> findBySubcategoryIn(List<String> subcategories);
}
