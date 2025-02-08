package rocket.jobrocketbackend.question.review_qa.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.review_qa.dto.response.ReviewQAResDto;
import rocket.jobrocketbackend.question.review_qa.entity.ReviewQAEntity;
import rocket.jobrocketbackend.question.review_qa.repository.ReviewQAJpaRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewQAService {
    private final ReviewQAJpaRepository reviewQAJpaRepository;
    private final AnswerService answerService;

    public List<ReviewQAResDto> getQuestionsByScheduleId(Long scheduleId, Long memberId) {
        List<ReviewQAEntity> questions = reviewQAJpaRepository.findBySchedule_Id(scheduleId);
        return questions.stream()
                .map(question -> convertToDto(question, memberId))
                .toList();
    }

    private ReviewQAResDto convertToDto(ReviewQAEntity question, Long memberId) {
        Optional<AnswerEntity> optionalAnswerEntity = answerService.findAnswerByMemberAndQid(memberId, Category.REVIEW_QA, question.getQid());
        AnswerEntity answerEntity = optionalAnswerEntity.orElse(null);

        return ReviewQAResDto.builder()
                .qid(question.getQid())
                .question(question.getQuestion())
                .answer(answerEntity != null ? answerEntity.getContent() : null)
                .answerId(answerEntity != null ? answerEntity.getAnswerId() : null)
                .isIn(answerEntity != null && answerEntity.isIn())
                .build();
    }
}
