package rocket.jobrocketbackend.question.cs.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;
import rocket.jobrocketbackend.question.cs.repository.CsRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CsService {
    private final CsRepository csRepository;
    private final AnswerService answerService;

    public List<CsResDto> findCsListBySubcategories(List<String> subcategories, Long memberId) {
        List<CsEntity> entities = csRepository.findBySubcategoryIn(subcategories);

        return entities.stream()
                .map(entity -> convertToDto(entity, memberId))
                .toList();
    }

    private CsResDto convertToDto(CsEntity entity, Long memberId) {
        Optional<AnswerEntity> optionalAnswerEntity = answerService.findAnswerByMemberAndQid(memberId, Category.CS, entity.getQid());
        AnswerEntity answerEntity = optionalAnswerEntity.orElse(null);

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
