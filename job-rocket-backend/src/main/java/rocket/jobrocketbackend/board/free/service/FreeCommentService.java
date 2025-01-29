package rocket.jobrocketbackend.board.free.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeCommentResponse;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;
import rocket.jobrocketbackend.board.free.exception.BoardNotFoundException;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.board.free.repository.FreeCommentRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FreeCommentService {

    private final FreeBoardRepository freeBoardRepository;
    private final FreeCommentRepository freeCommentRepository;
    private final UserRepository userRepository;

    public FreeCommentEntity create(final FreeCreateCommentRequest request, final Long boardId, final Long userId){
        UserEntity user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        FreeBoardEntity board = freeBoardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        FreeCommentEntity comment = FreeCommentEntity.create(user, board, request.getContent(), LocalDate.now());
        return freeCommentRepository.save(comment);
    }

    @Transactional(readOnly = true)
    public List<FreeCommentResponse> tempFindBoard(final Long boardId){
        //TODO 임시용 나중에 무한 스크롤 적용하기
        FreeBoardEntity board = freeBoardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        return freeCommentRepository.findByBoard(board).stream().map(FreeCommentResponse::from).toList();
    }
}
