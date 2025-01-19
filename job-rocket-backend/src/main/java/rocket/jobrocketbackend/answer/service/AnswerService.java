package rocket.jobrocketbackend.answer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.dto.response.AnswerListResDto;
import rocket.jobrocketbackend.answer.dto.response.AnswerResDto;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.exception.AnswerNotFoundException;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;
import rocket.jobrocketbackend.question.introduce_qa.repository.IntroduceQAJpaRepository;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.answer.repository.AnswerJpaRepository;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;
import rocket.jobrocketbackend.question.cs.repository.CsRepository;
import rocket.jobrocketbackend.question.personal.entity.PersonalEntity;
import rocket.jobrocketbackend.question.personal.repository.PersonalRepository;
import rocket.jobrocketbackend.question.introduce_qa.dto.response.IntroduceQAResDto;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;
import rocket.jobrocketbackend.question.introduce_qa.repository.IntroduceQAJpaRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerJpaRepository answerJpaRepository;
    private final UserRepository userRepository;
    private final CsRepository csRepository;
    private final PersonalRepository personalRepository;
    private final IntroduceQAJpaRepository introduceQARepository;

    public Long extractMemberIdFromAuthentication(Authentication authentication) {
        if (authentication == null) {
            log.info("asdfasf:", authentication.getDetails());
            throw new IllegalStateException("Authentication is missing");
        }
        String nickname = authentication.getName();
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return user.getId();
    }

    public AnswerListResDto findCheckedAnswerList(Authentication authentication) {
        Long memberId = extractMemberIdFromAuthentication(authentication);
        return getAnswerList(memberId, true);
    }

    public AnswerListResDto findUncheckedAnswerList(Authentication authentication) {
        Long memberId = extractMemberIdFromAuthentication(authentication);
        return getAnswerList(memberId, false);
    }

    private AnswerListResDto getAnswerList(Long memberId, boolean isIn) {
        Map<Category, List<AnswerResDto>> answersByCategory = Arrays.stream(Category.values())
                .collect(Collectors.toMap(
                        category -> category,
                        category -> mapToDto(answerJpaRepository.findByMemberIdAndCategoryAndIsIn(memberId, category, isIn), category)
                ));

        return AnswerListResDto.builder()
                .csAnswerList(answersByCategory.get(Category.CS))
                .personalAnswerList(answersByCategory.get(Category.PERSONAL))
                .introduceAnswerList(answersByCategory.get(Category.INTRODUCE_QA))
                .reviewAnswerList(answersByCategory.get(Category.REVIEW_QA))
                .build();
    }

    private List<AnswerResDto> mapToDto(List<AnswerEntity> entities, Category category) {
        return entities.stream()
                .map(entity -> AnswerResDto.builder()
                        .answerId(entity.getAnswerId())
                        .qid(entity.getQid())
                        .content(entity.getContent())
                        .category(Category.valueOf(entity.getCategory().getName()))
                        .question(fetchQuestionByCategoryAndQid(category, entity.getQid()))
                        .isIn(entity.isIn())
                        .build())
                .toList();
    }

    private String fetchQuestionByCategoryAndQid(Category category, Long qid) {
        return switch (category) {
            case CS -> csRepository.findById(qid)
                    .map(CsEntity::getQuestion)
                    .orElse("질문명을 찾을 수 없습니다.");
            case PERSONAL -> personalRepository.findById(qid)
                    .map(PersonalEntity::getQuestion)
                    .orElse("질문명을 찾을 수 없습니다.");
            case INTRODUCE_QA -> introduceQARepository.findById(qid)
                    .map(IntroduceQAEntity::getQuestion)
                    .orElse("질문명을 찾을 수 없습니다.");
            default -> "알 수 없는 카테고리입니다.";
        };
    }

    public Optional<AnswerEntity> findAnswerByMemberAndQid(Long memberId, Category category, Long qid) {
        return answerJpaRepository.findByMemberIdAndCategoryAndQid(memberId, category, qid);
    }

    public Long addAnswer(Authentication authentication, Category category, Long qid, String content, boolean isIn) {
        Long memberId = extractMemberIdFromAuthentication(authentication);
        UserEntity user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("user not found: ." + memberId));
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
                .orElseThrow(() -> new AnswerNotFoundException("Answer not found for ID: " + answerId));

        if (content != null) {
            existingAnswer.modifyContent(content);
        }
        answerJpaRepository.save(existingAnswer);
    }

    public void modifyAnswerIsIn(Long answerId) {
        AnswerEntity existingAnswer = answerJpaRepository.findById(answerId)
                .orElseThrow(() -> new AnswerNotFoundException("Answer not found for ID: " + answerId));

        existingAnswer.check();
        answerJpaRepository.save(existingAnswer);
    }

    public void removeAnswer(Authentication authentication, Category category, Long qid) {
        Long memberId = extractMemberIdFromAuthentication(authentication);
        UserEntity user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("user not found: " + memberId));

        AnswerEntity answer = answerJpaRepository.findByMemberAndCategoryAndQid(user, category, qid);
        if (answer != null) {
            answerJpaRepository.delete(answer);
        } else {
            throw new AnswerNotFoundException("Answer not found for the given criteria.");
        }
    }
}