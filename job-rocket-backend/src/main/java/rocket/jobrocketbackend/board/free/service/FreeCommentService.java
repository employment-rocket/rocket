package rocket.jobrocketbackend.board.free.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;
import rocket.jobrocketbackend.board.free.exception.BoardNotFoundException;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.board.free.repository.FreeCommentRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class FreeCommentService {

    private final FreeBoardRepository freeBoardRepository;
    private final FreeCommentRepository freeCommentRepository;
    private final UserRepository userRepository;

    public void create(final FreeCreateCommentRequest request, final Long boardId, final Long userId){
        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        FreeBoardEntity board = freeBoardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        FreeCommentEntity comment = FreeCommentEntity.builder().author(user).board(board).content(request.getContent()).postDate(LocalDate.now()).build();
        freeCommentRepository.save(comment);
    }
}
