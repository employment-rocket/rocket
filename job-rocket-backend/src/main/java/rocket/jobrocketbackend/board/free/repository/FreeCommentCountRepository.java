package rocket.jobrocketbackend.board.free.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.board.free.entity.FreeCommentCountEntity;

public interface FreeCommentCountRepository extends JpaRepository<FreeCommentCountEntity, Long> {
}
