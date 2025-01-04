package rocket.jobrocketbackend.question.personal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.repository.AnswerJpaRepository;
import rocket.jobrocketbackend.question.personal.dto.response.PersonalResDto;
import rocket.jobrocketbackend.question.personal.entity.PersonalEntity;
import rocket.jobrocketbackend.question.personal.repository.PersonalRepository;

@Service
@RequiredArgsConstructor
public class PersonalService {
    private static final int PAGE_SIZE = 5;
    private final PersonalRepository personalRepository;
    private final AnswerJpaRepository answerJpaRepository;

    public Page<PersonalResDto> findPersonalList(int page, Long memberId) {
        PageRequest pageable = PageRequest.of(page, PAGE_SIZE);
        return personalRepository.findAll(pageable)
                .map(entity -> convertToDto(entity, memberId));
    }

    private PersonalResDto convertToDto(PersonalEntity entity, Long memberId) {
        AnswerEntity answerEntity = answerJpaRepository
                .findByMemberIdAndCategoryAndQid(memberId, "personal", entity.getQid())
                .orElse(null);

        return PersonalResDto.builder()
                .qid(entity.getQid())
                .question(entity.getQuestion())
                .answer(answerEntity != null ? answerEntity.getContent() : "")
                .answerId(answerEntity != null ? answerEntity.getAnswerId() : null)
                .isIn(answerEntity != null && answerEntity.isIn())
                .build();
    }
}
