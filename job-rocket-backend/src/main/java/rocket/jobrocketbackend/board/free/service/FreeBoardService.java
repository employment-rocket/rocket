package rocket.jobrocketbackend.board.free.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;

@Service
@AllArgsConstructor
@Transactional
public class FreeBoardService {

    private final FreeBoardRepository freeBoardRepository;
    private final UserRepository userRepository;

    public void create(final FreeBoardCreateRequest request, final String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("존재하지 않는 유저입니다."));
        LocalDate today = LocalDate.now();
        FreeBoardEntity board = request.toEntity(today, user);
        freeBoardRepository.save(board);
    }
}
