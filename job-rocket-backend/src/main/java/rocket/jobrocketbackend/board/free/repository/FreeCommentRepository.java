package rocket.jobrocketbackend.board.free.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;

import java.util.List;

public interface FreeCommentRepository extends JpaRepository<FreeCommentEntity,Long> {

    List<FreeCommentEntity> findByBoard(FreeBoardEntity board);
}
