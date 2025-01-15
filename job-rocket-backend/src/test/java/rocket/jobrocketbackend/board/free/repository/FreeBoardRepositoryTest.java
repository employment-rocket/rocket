package rocket.jobrocketbackend.board.free.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@Transactional
public class FreeBoardRepositoryTest {

    @Autowired
    private FreeBoardRepository freeBoardRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void init(){
        UserEntity user = UserEntity.builder().email("test@naver.com").allowEmail(false).build();
        userRepository.save(user);
    }

    @Test
    @DisplayName("새로운 게시글을 오늘 날짜에 작성한다.")
    void create() {
        // given
        LocalDate today = LocalDate.now();
        UserEntity user = userRepository.findByEmail("test@naver.com").get();
        FreeBoardEntity board = FreeBoardEntity.builder().title("제목").content("내용").postDate(today).user(user).build();
        // when
        FreeBoardEntity save = freeBoardRepository.save(board);
        // then
        assertThat(save.getContent()).isEqualTo("내용");
        assertThat(save.getTitle()).isEqualTo("제목");
        assertThat(save.getPostDate()).isEqualTo(today);
        assertThat(save.getUser().getEmail()).isEqualTo("test@naver.com");
    }
}
