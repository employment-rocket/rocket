package rocket.jobrocketbackend.board.free.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;
import rocket.jobrocketbackend.board.free.exception.AccessDeniedException;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.board.free.repository.FreeCommentRepository;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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

    @Autowired
    private FreeCommentRepository freeCommentRepository;

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

    @Test
    @DisplayName("댓글 삭제")
    void delete() {
        //given
        FreeCreateCommentRequest request = FreeCreateCommentRequest.builder().content("내용입니다.").build();
        FreeCommentEntity comment = freeCommentService.create(request, boardId, userId);
        int before = freeCommentRepository.findAll().size();
        // when
        freeCommentService.delete(comment.getCommentId(), userId);
        int after = freeCommentRepository.findAll().size();
        // then
        assertThat(freeCommentRepository.findById(comment.getCommentId()))
                .isEmpty();
        assertThat(after).isEqualTo(before - 1);
    }

    @Test
    @DisplayName("댓글 삭제시 댓글 작성자가 아닐시 예외발생")
    void deleteException() {
        //given
        FreeCreateCommentRequest request = FreeCreateCommentRequest.builder().content("내용입니다.").build();
        FreeCommentEntity comment = freeCommentService.create(request, boardId, userId);
        int before = freeCommentRepository.findAll().size();
        // when
        // then
        assertThatThrownBy(() -> freeCommentService.delete(comment.getCommentId(), userId+1)).isInstanceOf(AccessDeniedException.class)
                .hasMessage("본인 댓글만 삭제할 수 있습니다.");
    }
}