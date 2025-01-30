package rocket.jobrocketbackend.board.free.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class FreeCommentServiceTest {

    @Autowired
    private FreeBoardRepository freeBoardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FreeCommentService freeCommentService;

    private Long userId;
    private Long boardId;

    @BeforeEach
    void init(){
        UserEntity user = UserEntity.builder().nickname("닉네임").email("test@naver.com").role(Role.MEMBER).allowEmail(false).allowAlarm(false).build();
        userRepository.save(user);
        FreeBoardEntity board = FreeBoardEntity.builder().build();
        freeBoardRepository.save(board);
        userId = user.getId();
        boardId = board.getId();
    }

    @Test
    void create() {
        //given
        FreeCreateCommentRequest request = FreeCreateCommentRequest.builder().content("내용입니다.").build();
        //when
        FreeCommentEntity result = freeCommentService.create(request, boardId, userId);
        //then
        assertThat(result.getContent()).isEqualTo("내용입니다.");
    }
}