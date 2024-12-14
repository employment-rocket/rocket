package rocket.jobrocketbackend.question.cs.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CsResDto {
    private Long qid;
    private String question;
    private String suggested;
    private String answer;
}
