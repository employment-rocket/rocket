package rocket.jobrocketbackend.question.cs.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;
import rocket.jobrocketbackend.question.cs.repository.CsRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CsService {
    private final CsRepository csRepository;
    private final AnswerService answerService;

    public List<CsResDto> findCsListBySubcategories(List<String> subcategories, Authentication authentication) {
        Long memberId = answerService.extractMemberIdFromAuthentication(authentication);
        List<CsEntity> entities = csRepository.findBySubcategoryIn(subcategories);

        return entities.stream()
                .map(entity -> convertToDto(entity, memberId))
                .collect(Collectors.toList());
    }

    private CsResDto convertToDto(CsEntity entity, Long memberId) {
        AnswerEntity answerEntity = answerService.findAnswerByMemberAndQid(memberId, Category.CS, entity.getQid());

        return CsResDto.builder()
                .qid(entity.getQid())
                .answerId(answerEntity != null ? answerEntity.getAnswerId() : null)
                .question(entity.getQuestion())
                .subcategory(entity.getSubcategory())
                .suggested(entity.getSuggested())
                .answer(answerEntity != null ? answerEntity.getContent() : null)
                .isIn(answerEntity != null && answerEntity.isIn())
                .build();
    }
}
