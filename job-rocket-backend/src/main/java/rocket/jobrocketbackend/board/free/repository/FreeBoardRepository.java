package rocket.jobrocketbackend.board.free.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;

public interface FreeBoardRepository extends JpaRepository<FreeBoardEntity,Long> {
}
