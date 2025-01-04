package rocket.jobrocketbackend.question.introduce_qa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "introduce_qa")
public class IntroduceQAEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qid;

    private String question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "introduce_id", nullable = false)
    private IntroduceEntity introduce;
}
