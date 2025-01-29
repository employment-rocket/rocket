package rocket.jobrocketbackend.board.free.entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity(name = "free_comment")
public class FreeCommentEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate postDate;

    @ManyToOne(fetch = FetchType.EAGER) //TODO 추후에 lazy로 수정하기
    @JoinColumn(name = "free_board_id")
    private FreeBoardEntity board;

}
