package rocket.jobrocketbackend.board.free.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

@Entity(name = "free_comment")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FreeCommentEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate postDate;

    @ManyToOne(fetch = FetchType.EAGER) //TODO 추후에 lazy로 수정하기
    @JoinColumn(name = "free_board_id")
    private FreeBoardEntity board;

    @ManyToOne(fetch = FetchType.EAGER)  //TODO 추후에 lazy로 수정하기
    @JoinColumn(name = "member_id")
    private UserEntity author;
}
