package rocket.jobrocketbackend.board.free.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rocket.jobrocketbackend.board.free.entity.FreeCommentCountEntity;

public interface FreeCommentCountRepository extends JpaRepository<FreeCommentCountEntity, Long> {

    @Query(value = "update free_comment_count set count = count + 1 where free_board_id = :boardId",
            nativeQuery = true)
    @Modifying
    void increase(@Param("boardId") Long boardId);

    @Query(value = "update free_comment_count set count = count - 1 where free_board_id = :boardId",
            nativeQuery = true)
    @Modifying
    void decrease(@Param("boardId") Long boardId);

}
