package rocket.jobrocketbackend.question.personal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PersonalResDto {
    private Long qid;
    private Long answerId;
    private String question;
    private String answer;
    private boolean isIn;
}