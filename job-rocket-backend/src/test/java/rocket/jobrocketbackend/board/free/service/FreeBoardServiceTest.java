package rocket.jobrocketbackend.board.free.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.exception.AccessDeniedException;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class FreeBoardServiceTest {

    @Autowired
    private FreeBoardService freeBoardService;

    @Autowired
    private FreeBoardRepository freeBoardRepository;

    @Autowired
    private UserRepository userRepository;

    private Long userId;

    @BeforeEach
    void init(){
        UserEntity user = UserEntity.builder().nickname("닉네임").email("test@naver.com").role(Role.MEMBER).allowEmail(false).allowAlarm(false).build();
        userRepository.save(user);
        userId = user.getId();
    }

    @Test
    @DisplayName("새로운 자유 게시물을 생성한다.")
    void create() {
        //given
        LocalDate today = LocalDate.now();
        FreeBoardCreateRequest request = FreeBoardCreateRequest.builder().title("제목").content("내용").build();
        //when
        FreeBoardResponse result = freeBoardService.create(request, "test@naver.com", today);
        //then
        assertThat(result.getContent()).isEqualTo("내용");
        assertThat(result.getTitle()).isEqualTo("제목");
        assertThat(result.getPostDate()).isEqualTo(today);
        assertThat(result.getNickName()).isEqualTo("닉네임");
    }

    @Test
    @DisplayName("기존 자유게시물 번호를 삭제한다.")
    void delete() {
        // given
        UserEntity user = userRepository.findById(userId).get();
        FreeBoardEntity board = FreeBoardEntity.builder()
                .title("테스트 제목")
                .content("테스트 내용")
                .user(user)
                .build();
        FreeBoardEntity saved = freeBoardRepository.save(board);
        int before = freeBoardRepository.findAll().size();
        // when
        freeBoardService.delete(saved.getId(),userId);
        // then
        assertThat(freeBoardRepository.findById(saved.getId()))
                .isEmpty();
        int after = freeBoardRepository.findAll().size();
        assertThat(after).isEqualTo(before - 1);
    }

    @Test
    @DisplayName("기존 자유게시물 번호를 삭제 시 요청자와 작성자가 다르면 예외를 던진다.")
    void deleteException() {
        // given
        UserEntity user = userRepository.findById(userId).get();
        FreeBoardEntity board = FreeBoardEntity.builder()
                .title("테스트 제목")
                .content("테스트 내용")
                .user(user)
                .build();
        FreeBoardEntity saved = freeBoardRepository.save(board);
        int before = freeBoardRepository.findAll().size();
        // when
        // then
        assertThatThrownBy(() -> freeBoardService.delete(saved.getId(),userId + 1)).isInstanceOf(
                AccessDeniedException.class
        ).hasMessage("본인의 게시글만 삭제할 수 있습니다.");
    }
}