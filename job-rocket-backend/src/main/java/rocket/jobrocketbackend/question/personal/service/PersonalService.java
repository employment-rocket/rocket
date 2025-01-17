package rocket.jobrocketbackend.question.personal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.personal.dto.response.PersonalResDto;
import rocket.jobrocketbackend.question.personal.entity.PersonalEntity;
import rocket.jobrocketbackend.question.personal.repository.PersonalRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PersonalService {
    private final PersonalRepository personalRepository;
    private final AnswerService answerService;

    public List<PersonalResDto> findAllPersonal(Authentication authentication) {
        Long memberId = answerService.extractMemberIdFromAuthentication(authentication);
        List<PersonalEntity> personalEntities = personalRepository.findAll();
        return personalEntities.stream()
                .map(entity -> convertToDto(entity, memberId))
                .collect(Collectors.toList());
    }

    private PersonalResDto convertToDto(PersonalEntity entity, Long memberId) {
        AnswerEntity answerEntity = answerService.findAnswerByMemberAndQid(memberId, Category.PERSONAL, entity.getQid());

        return PersonalResDto.builder()
                .qid(entity.getQid())
                .question(entity.getQuestion())
                .answer(answerEntity.getContent())
                .answerId(answerEntity.getAnswerId())
                .isIn(answerEntity.isIn())
                .build();
    }
}