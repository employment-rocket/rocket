package rocket.jobrocketbackend.board.free.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

@Entity(name = "free_board")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FreeBoardEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate postDate;

    @ManyToOne(fetch = FetchType.EAGER)// TODO 추후 변경
    @JoinColumn(name = "member_id")
    private UserEntity user;

    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }
}
