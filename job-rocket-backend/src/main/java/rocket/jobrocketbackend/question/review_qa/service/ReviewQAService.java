package rocket.jobrocketbackend.question.review_qa.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.review_qa.dto.request.ReviewQAReqDto;
import rocket.jobrocketbackend.question.review_qa.dto.response.ReviewQAResDto;
import rocket.jobrocketbackend.question.review_qa.entity.ReviewQAEntity;
import rocket.jobrocketbackend.question.review_qa.repository.ReviewQAJpaRepository;
import rocket.jobrocketbackend.schedule.entity.ScheduleEntity;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewQAService {
    private final ReviewQAJpaRepository reviewQAJpaRepository;
    private final AnswerService answerService;
    private final ScheduleRepository scheduleRepository;

    public List<ReviewQAResDto> getQuestionsByScheduleId(Long scheduleId, Long memberId) {
        List<ReviewQAEntity> questions = reviewQAJpaRepository.findBySchedule_Id(scheduleId);
        return questions.stream()
                .map(question -> convertToDto(question, memberId))
                .toList();
    }

    @Transactional
    public ReviewQAResDto createReviewQA(ReviewQAReqDto reviewQAReqDto, Long memberId) {
        ScheduleEntity schedule = scheduleRepository.findById(reviewQAReqDto.getScheduleId())
                .orElseThrow(() -> new IllegalArgumentException("해당 일정이 존재하지 않습니다."));

        ReviewQAEntity reviewQA = ReviewQAEntity.builder()
                .question(reviewQAReqDto.getQuestion())
                .schedule(schedule)
                .build();
        ReviewQAEntity savedReviewQA = reviewQAJpaRepository.save(reviewQA);

        return getReviewQAResDto(savedReviewQA, memberId);
    }

    private ReviewQAResDto convertToDto(ReviewQAEntity question, Long memberId) {
        return getReviewQAResDto(question, memberId);
    }

    private ReviewQAResDto getReviewQAResDto(ReviewQAEntity question, Long memberId) {
        Optional<AnswerEntity> optionalAnswerEntity = answerService.findAnswerByMemberAndQid(
                memberId, Category.REVIEW_QA, question.getQid()
        );
        AnswerEntity answerEntity = optionalAnswerEntity.orElse(null);

        return ReviewQAResDto.builder()
                .qid(question.getQid())
                .question(question.getQuestion())
                .answerId(answerEntity != null ? answerEntity.getAnswerId() : null)
                .isIn(answerEntity != null && answerEntity.isIn())
                .build();
    }

    @Transactional
    public void deleteReviewByScheduleId(Long scheduleId) {
        if (!scheduleRepository.existsById(scheduleId)) {
            throw new IllegalArgumentException("해당 일정이 존재하지 않습니다.");
        }
        reviewQAJpaRepository.deleteBySchedule_Id(scheduleId);
    }

    @Transactional
    public void deleteReviewQAById(Long qid) {
        if (!reviewQAJpaRepository.existsById(qid)) {
            throw new IllegalArgumentException("해당 질문이 존재하지 않습니다.");
        }
        reviewQAJpaRepository.deleteById(qid);
    }

    @Transactional
    public ReviewQAResDto updateReviewQA(Long qid, String newQuestion, Long memberId) {
        ReviewQAEntity reviewQA = reviewQAJpaRepository.findById(qid)
                .orElseThrow(() -> new IllegalArgumentException("해당 질문이 존재하지 않습니다."));

        reviewQA.updateQuestion(newQuestion);

        return ReviewQAResDto.builder()
                .qid(reviewQA.getQid())
                .question(reviewQA.getQuestion())
                .build();
    }
}
