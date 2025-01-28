package rocket.jobrocketbackend.board.free.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.exception.AccessDeniedException;
import rocket.jobrocketbackend.board.free.exception.BoardNotFoundException;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class FreeBoardService {

    private final FreeBoardRepository freeBoardRepository;
    private final UserRepository userRepository;

    public FreeBoardResponse create(final FreeBoardCreateRequest request, final String email,final LocalDate today) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("존재하지 않는 유저입니다."));
        FreeBoardEntity board = freeBoardRepository.save(request.toEntity(today, user));
        return FreeBoardResponse.from(board);
    }

    public void delete(final Long boardId, final Long userId){
        FreeBoardEntity board = freeBoardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException("존재하지 않는 boardID입니다."));
        if(isNotAuthor(userId, board)){
            throw new AccessDeniedException("본인의 게시글만 삭제할 수 있습니다.");
        }
        freeBoardRepository.deleteById(boardId);
    }

    private static boolean isNotAuthor(Long userId, FreeBoardEntity board) {
        return !board.getUser().getId().equals(userId);
    }

    public List<FreeBoardEntity> findAll() {
        //TODO 임시
        return freeBoardRepository.findAll();
    }
}
