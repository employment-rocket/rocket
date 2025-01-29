package rocket.jobrocketbackend.board.free.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;

public interface FreeCommentRepository extends JpaRepository<FreeCommentEntity,Long> {
}
