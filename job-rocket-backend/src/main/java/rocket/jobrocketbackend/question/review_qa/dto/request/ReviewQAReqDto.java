package rocket.jobrocketbackend.question.review_qa.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReviewQAReqDto {
    private Long scheduleId;
    private String question;
}