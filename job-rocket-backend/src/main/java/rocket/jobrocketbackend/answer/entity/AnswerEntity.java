package rocket.jobrocketbackend.answer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.user.entity.UserEntity;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "answer")
public class AnswerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long answerId;

    private Long qid;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private UserEntity member;

    private String content;

    private String category;

    @Column(name = "is_in")
    private boolean isIn;

    public void update(String content, boolean isIn) {
        this.content = content;
        this.isIn = isIn;
    }

    public void check(){
        this.isIn = !this.isIn;
    }

    public void modifyContent(String content) {
        this.content = content;
    }
}
