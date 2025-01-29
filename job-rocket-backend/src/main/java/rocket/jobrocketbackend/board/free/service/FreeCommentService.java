package rocket.jobrocketbackend.board.free.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.board.free.repository.FreeCommentRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class FreeCommentService {

    private final FreeBoardRepository freeBoardRepository;
    private final FreeCommentRepository freeCommentRepository;

    public void create(final FreeCreateCommentRequest request, final Long boardId){
        freeBoardRepository.findById(boardId).orElseThrow();
        freeBoardRepository.save();
    }
}
