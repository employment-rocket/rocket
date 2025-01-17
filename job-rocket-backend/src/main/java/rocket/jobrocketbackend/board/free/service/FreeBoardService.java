package rocket.jobrocketbackend.board.free.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.exception.MemberNotFoundException;
import rocket.jobrocketbackend.member.repository.MemberRepository;

import java.time.LocalDate;

@Service
@AllArgsConstructor
@Transactional
public class FreeBoardService {

    private final FreeBoardRepository freeBoardRepository;
    private final MemberRepository userRepository;

    public FreeBoardResponse create(final FreeBoardCreateRequest request, final String email,final LocalDate today) {
        MemberEntity user = userRepository.findByEmail(email).orElseThrow(() -> new MemberNotFoundException("존재하지 않는 유저입니다."));
        FreeBoardEntity board = freeBoardRepository.save(request.toEntity(today, user));
        return FreeBoardResponse.from(board);
    }
}
