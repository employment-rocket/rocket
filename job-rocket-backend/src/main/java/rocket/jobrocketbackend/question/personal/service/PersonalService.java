package rocket.jobrocketbackend.question.personal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.personal.dto.response.PersonalResDto;
import rocket.jobrocketbackend.question.personal.entity.PersonalEntity;
import rocket.jobrocketbackend.question.personal.repository.PersonalRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonalService {
    private final PersonalRepository personalRepository;
    private final AnswerService answerService;

    public List<PersonalResDto> findAllPersonal(Long memberId) {
        List<PersonalEntity> personalEntities = personalRepository.findAll();
        return personalEntities.stream()
                .map(entity -> convertToDto(entity, memberId))
                .toList();
    }

    private PersonalResDto convertToDto(PersonalEntity entity, Long memberId) {
        Optional<AnswerEntity> optionalAnswerEntity = answerService.findAnswerByMemberAndQid(memberId, Category.PERSONAL, entity.getQid());
        AnswerEntity answerEntity = optionalAnswerEntity.orElse(null);

        return PersonalResDto.builder()
                .qid(entity.getQid())
                .question(entity.getQuestion())
                .answer(answerEntity != null ? answerEntity.getContent() : null)
                .answerId(answerEntity != null ? answerEntity.getAnswerId() : null)
                .isIn(answerEntity != null && answerEntity.isIn())
                .build();
    }
}
