package rocket.jobrocketbackend.board.free.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity(name = "free_comment_count")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class FreeCommentCountEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "free_board_id")
    FreeBoardEntity board;

    private Long count;

    public static FreeCommentCountEntity create(FreeBoardEntity board) {
        return FreeCommentCountEntity.builder().board(board)
                .count(0L).build();
    }
}
