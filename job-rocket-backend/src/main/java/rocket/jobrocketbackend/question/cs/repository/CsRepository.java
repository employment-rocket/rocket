package rocket.jobrocketbackend.question.cs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;

import java.util.List;

public interface CsRepository extends JpaRepository<CsEntity, Long> {
    Page<CsEntity> findBySubcategoryIn(List<String> subcategories, Pageable pageable);
}
