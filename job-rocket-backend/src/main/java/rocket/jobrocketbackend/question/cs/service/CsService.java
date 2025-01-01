package rocket.jobrocketbackend.question.cs.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;
import rocket.jobrocketbackend.question.cs.repository.CsRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CsService {
    private static final int PAGE_SIZE = 4;
    private final CsRepository csRepository;
    private final AnswerService answerService;

    public Page<CsResDto> findCsListBySubcategories(int page, Long memberId, List<String> subcategories) {
        PageRequest pageable = PageRequest.of(page, PAGE_SIZE);
        return csRepository.findBySubcategoryIn(subcategories, pageable)
                .map(entity -> convertToDto(entity, memberId));
    }

    private CsResDto convertToDto(CsEntity entity, Long memberId) {
        AnswerEntity answerEntity = answerService.findAnswerByMemberAndQid(memberId, Category.CS, entity.getQid());

        return CsResDto.builder()
                .qid(entity.getQid())
                .answerId(answerEntity.getAnswerId())
                .question(entity.getQuestion())
                .subcategory(entity.getSubcategory())
                .suggested(entity.getSuggested())
                .answer(answerEntity.getContent())
                .isIn(answerEntity.isIn())
                .build();
    }
}
