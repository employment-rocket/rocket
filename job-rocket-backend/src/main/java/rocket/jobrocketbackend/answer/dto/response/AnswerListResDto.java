package rocket.jobrocketbackend.answer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class AnswerListResDto {
    private List<AnswerResDto> csAnswerList;
    private List<AnswerResDto> personalAnswerList;
    private List<AnswerResDto> companyAnswerList;
    private List<AnswerResDto> introduceAnswerList;
    private List<AnswerResDto> reviewAnswerList;
}