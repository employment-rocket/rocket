package rocket.jobrocketbackend.answer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import rocket.jobrocketbackend.common.entity.Category;

@Getter
@Builder
@AllArgsConstructor
public class AnswerResDto {
    private Long answerId;
    private Long qid;
    private String question;
    private String content;
    private Category category;
    private boolean isIn;
}
