package rocket.jobrocketbackend.answer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "answer")
public class AnswerEntity {
    @Id
    @GeneratedValue
    @Column(name = "answer_id")
    private Long answerId;

    private Long qid;
    private Long memberId;

    private String content;

    private String category;

    private boolean isIn = false;
}
