package rocket.jobrocketbackend.board.free.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class FreeBoardServiceTest {

    @Autowired
    private FreeBoardService freeBoardService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void init(){
        UserEntity user = UserEntity.builder().nickname("닉네임").email("test@naver.com").allowEmail(false).build();
        userRepository.save(user);
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
}