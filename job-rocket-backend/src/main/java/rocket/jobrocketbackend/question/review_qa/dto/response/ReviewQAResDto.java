package rocket.jobrocketbackend.question.review_qa.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ReviewQAResDto {
    private Long qid;
    private Long answerId;
    private String question;
    private boolean isIn;
}