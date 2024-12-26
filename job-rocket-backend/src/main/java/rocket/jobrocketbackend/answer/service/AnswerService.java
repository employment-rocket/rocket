package rocket.jobrocketbackend.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.dto.response.AnswerListResDto;
import rocket.jobrocketbackend.answer.dto.response.AnswerResDto;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.repository.AnswerJpaRepository;
import rocket.jobrocketbackend.question.cs.repository.CsRepository;
import rocket.jobrocketbackend.question.personal.repository.PersonalRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;
import rocket.jobrocketbackend.question.personal.entity.PersonalEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerJpaRepository answerJpaRepository;
    private final UserRepository userRepository;
    private final CsRepository csRepository;
    private final PersonalRepository personalRepository;


    public AnswerListResDto findCheckedAnswerList(Long memberId) {
        String[] categories = {"cs", "personal", "company", "introduce", "review"};
        Map<String, List<AnswerResDto>> answersByCategory = Arrays.stream(categories)
                .collect(Collectors.toMap(
                        category -> category,
                        category -> mapToDto(answerJpaRepository.findByMemberIdAndCategoryAndIsIn(memberId, category, true), category)
                ));

        return AnswerListResDto.builder()
                .csAnswerList(answersByCategory.get("cs"))
                .personalAnswerList(answersByCategory.get("personal"))
                .companyAnswerList(answersByCategory.get("company"))
                .introduceAnswerList(answersByCategory.get("introduce"))
                .reviewAnswerList(answersByCategory.get("review"))
                .build();
    }

    private List<AnswerResDto> mapToDto(List<AnswerEntity> entities, String category) {
        return entities.stream()
                .map(entity -> AnswerResDto.builder()
                        .answerId(entity.getAnswerId())
                        .qid(entity.getQid())
                        .content(entity.getContent())
                        .category(entity.getCategory())
                        .question(fetchQuestionByCategoryAndQid(category, entity.getQid())) // 질문명 가져오기
                        .isIn(entity.isIn())
                        .build())
                .toList();
    }

    private String fetchQuestionByCategoryAndQid(String category, Long qid) {
        switch (category) {
            case "cs":
                return csRepository.findById(qid)
                        .map(CsEntity::getQuestion)
                        .orElse("질문명을 찾을 수 없습니다.");
            case "personal":
                return personalRepository.findById(qid)
                        .map(PersonalEntity::getQuestion)
                        .orElse("질문명을 찾을 수 없습니다.");
            /*case "company":
                return companyQuestionRepository.findByQid(qid)
                        .map(CompanyQuestionEntity::getQuestion)
                        .orElse("질문명을 찾을 수 없습니다.");
            case "introduce":
                return introduceQuestionRepository.findByQid(qid)
                        .map(IntroduceQuestionEntity::getQuestion)
                        .orElse("질문명을 찾을 수 없습니다.");
            case "review":
                return reviewQuestionRepository.findByQid(qid)
                        .map(ReviewQuestionEntity::getQuestion)
                        .orElse("질문명을 찾을 수 없습니다.");*/
            default:
                return "알 수 없는 카테고리입니다.";
        }
    }

    public Long addAnswer(Long memberId, String category, Long qid, String content, boolean isIn) {
        UserEntity user = userRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for ID: " + memberId));
        AnswerEntity answer = AnswerEntity.builder()
                .member(user)
                .category(category)
                .qid(qid)
                .content(content)
                .isIn(isIn)
                .build();
        AnswerEntity savedAnswer = answerJpaRepository.save(answer);
        return savedAnswer.getAnswerId();
    }

    public void modifyAnswerContent(Long answerId, String content) {
        AnswerEntity existingAnswer = answerJpaRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("Answer not found for ID: " + answerId));

        if (content != null) {
            existingAnswer.modifyContent(content);
        }
        answerJpaRepository.save(existingAnswer);
    }

    public void modifyAnswerIsIn(Long answerId) {
        AnswerEntity existingAnswer = answerJpaRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("Answer not found for ID: " + answerId));

        existingAnswer.check();
        answerJpaRepository.save(existingAnswer);
    }

    public void removeAnswer(Long memberId, String category, Long qid) {
        UserEntity user = userRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for ID: " + memberId));

        AnswerEntity answer = answerJpaRepository.findByMemberAndCategoryAndQid(user, category, qid);
        if (answer != null) {
            answerJpaRepository.delete(answer);
        } else {
            throw new IllegalArgumentException("Answer not found for the given criteria.");
        }
    }
}