package rocket.jobrocketbackend.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.dto.response.AnswerListResDto;
import rocket.jobrocketbackend.answer.dto.response.AnswerResDto;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.repository.AnswerJpaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerJpaRepository answerJpaRepository;

    public AnswerListResDto findCheckedAnswerList(Long memberId) {
        List<AnswerResDto> checkedCsAnswerList = mapToDto(answerJpaRepository.findByMemberIdAndCategoryAndIsIn(memberId, "cs", true));
        List<AnswerResDto> checkedPersonalAnswerList = mapToDto(answerJpaRepository.findByMemberIdAndCategoryAndIsIn(memberId, "personal", true));
        List<AnswerResDto> checkedCompanyAnswerList = mapToDto(answerJpaRepository.findByMemberIdAndCategoryAndIsIn(memberId, "company", true));
        List<AnswerResDto> checkedIntroduceAnswerList = mapToDto(answerJpaRepository.findByMemberIdAndCategoryAndIsIn(memberId, "introduce", true));
        List<AnswerResDto> checkedReviewAnswerList = mapToDto(answerJpaRepository.findByMemberIdAndCategoryAndIsIn(memberId, "review", true));

        return AnswerListResDto.builder()
                .csAnswerList(checkedCsAnswerList)
                .personalAnswerList(checkedPersonalAnswerList)
                .companyAnswerList(checkedCompanyAnswerList)
                .introduceAnswerList(checkedIntroduceAnswerList)
                .reviewAnswerList(checkedReviewAnswerList)
                .build();
    }

    private List<AnswerResDto> mapToDto(List<AnswerEntity> entities) {
        return entities.stream()
                .map(entity -> AnswerResDto.builder()
                        .answerId(entity.getAnswerId())
                        .qid(entity.getQid())
                        .content(entity.getContent())
                        .category(entity.getCategory())
                        .isIn(entity.isIn())
                        .build())
                .toList();
    }

    public void addAnswer(Long memberId, String category, Long qid, String content, boolean isIn) {
        AnswerEntity answer = AnswerEntity.builder()
                .memberId(memberId)
                .category(category)
                .qid(qid)
                .content(content)
                .isIn(isIn)
                .build();
        answerJpaRepository.save(answer);
    }

    public void modifyAnswer(Long memberId, String category, Long qid, String content, Boolean isIn) {
        AnswerEntity existingAnswer = answerJpaRepository.findByMemberIdAndCategoryAndQid(memberId, category, qid);
        if (existingAnswer != null) {
            AnswerEntity updatedAnswer = AnswerEntity.builder()
                    .answerId(existingAnswer.getAnswerId())
                    .memberId(existingAnswer.getMemberId())
                    .category(existingAnswer.getCategory())
                    .qid(existingAnswer.getQid())
                    .content(content != null ? content : existingAnswer.getContent())
                    .isIn(isIn != null ? isIn : existingAnswer.isIn())
                    .build();
            answerJpaRepository.save(updatedAnswer);
        } else {
            throw new IllegalArgumentException("Answer not found for the given criteria.");
        }
    }

    public void removeAnswer(Long memberId, String category, Long qid) {
        AnswerEntity answer = answerJpaRepository.findByMemberIdAndCategoryAndQid(memberId, category, qid);
        if (answer != null) {
            answerJpaRepository.delete(answer);
        } else {
            throw new IllegalArgumentException("Answer not found for the given criteria.");
        }
    }
}
