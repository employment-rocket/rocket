package rocket.jobrocketbackend.question.cs.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.answer.repository.AnswerJpaRepository;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.entity.CsEntity;
import rocket.jobrocketbackend.question.cs.repository.CsRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CsService {
    private static final int PAGE_SIZE = 5;
    private final CsRepository csRepository;
    private final AnswerJpaRepository answerJpaRepository;

    public Page<CsResDto> findCsList(int page, Long memberId) {
        PageRequest pageable = PageRequest.of(page, PAGE_SIZE);
        Page<CsEntity> csEntities = csRepository.findAll(pageable);

        return csEntities.map(entity -> convertToDto(entity, memberId));
    }

    private CsResDto convertToDto(CsEntity entity, Long memberId) {
        Optional<AnswerEntity> answerEntity = Optional.ofNullable(
                answerJpaRepository.findByMemberIdAndCategoryAndQid(memberId, "cs", entity.getQid())
        );

        return new CsResDto(
                entity.getQid(),
                entity.getQuestion(),
                entity.getSuggested(),
                answerEntity.map(AnswerEntity::getContent).orElse("")
        );
    }
}
