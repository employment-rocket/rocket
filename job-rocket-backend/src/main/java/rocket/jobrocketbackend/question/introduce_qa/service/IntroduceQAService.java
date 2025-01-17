package rocket.jobrocketbackend.question.introduce_qa.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.introduce_qa.dto.response.IntroduceQAResDto;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;
import rocket.jobrocketbackend.question.introduce_qa.repository.IntroduceQAJpaRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IntroduceQAService {
    private final IntroduceQAJpaRepository introduceQAJpaRepository;
    private final AnswerService answerService;

    public List<IntroduceQAResDto> getQuestionsByIntroduceId(Long introduceId, Authentication authentication) {
        Long memberId = answerService.extractMemberIdFromAuthentication(authentication);
        List<IntroduceQAEntity> questions = introduceQAJpaRepository.findByIntroduce_IntroduceId(introduceId);

        return questions.stream()
                .map(question -> convertToDto(question, memberId))
                .toList();
    }

    private IntroduceQAResDto convertToDto(IntroduceQAEntity question, Long memberId) {
        Optional<AnswerEntity> optionalAnswerEntity = answerService.findAnswerByMemberAndQid(memberId, Category.INTRODUCE_QA, question.getQid());
        AnswerEntity answerEntity = optionalAnswerEntity.orElse(null);

        return IntroduceQAResDto.builder()
                .qid(question.getQid())
                .question(question.getQuestion())
                .answer(answerEntity != null ? answerEntity.getContent() : null)
                .answerId(answerEntity != null ? answerEntity.getAnswerId() : null)
                .isIn(answerEntity != null && answerEntity.isIn())
                .build();
    }
}