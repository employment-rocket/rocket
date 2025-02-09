package rocket.jobrocketbackend.board.free.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;

import java.util.List;

public interface FreeCommentRepository extends JpaRepository<FreeCommentEntity,Long> {

    List<FreeCommentEntity> findByBoard(FreeBoardEntity board);

    @Query("SELECT b.user.id FROM free_comment c JOIN c.board b WHERE c.author.id = :userId AND b.id = :boardId")
    Long findBoardWriterByUserIdAndBoardId(@Param("userId") Long userId, @Param("boardId") Long boardId);



}
