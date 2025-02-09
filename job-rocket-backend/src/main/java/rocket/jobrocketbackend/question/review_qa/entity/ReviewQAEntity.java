package rocket.jobrocketbackend.question.review_qa.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "review_qa")
public class ReviewQAEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qid;

    private String question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    private ScheduleEntity schedule;

    public void updateQuestion(String newQuestion) {
        this.question = newQuestion;
    }
}