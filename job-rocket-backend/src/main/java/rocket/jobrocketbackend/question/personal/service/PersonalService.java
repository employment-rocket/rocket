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

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonalService {
    private static final int PAGE_SIZE = 5;
    private final PersonalRepository personalRepository;
    private final AnswerJpaRepository answerJpaRepository;

    public Page<PersonalResDto> findPersonalList(int page, Long memberId) {
        PageRequest pageable = PageRequest.of(page, PAGE_SIZE);
        Page<PersonalEntity> personalEntities = personalRepository.findAll(pageable);

        return personalEntities.map(entity -> convertToDto(entity, memberId));
    }

    private PersonalResDto convertToDto(PersonalEntity entity, Long memberId) {
        Optional<AnswerEntity> answerEntity = Optional.ofNullable(
                answerJpaRepository.findByMemberIdAndCategoryAndQid(memberId, "personal", entity.getQid())
        );

        return new PersonalResDto(
                entity.getQid(),
                entity.getQuestion(),
                answerEntity.map(AnswerEntity::getContent).orElse("")
        );
    }
}
