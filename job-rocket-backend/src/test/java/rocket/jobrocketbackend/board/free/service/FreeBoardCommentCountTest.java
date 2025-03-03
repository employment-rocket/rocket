package rocket.jobrocketbackend.board.free.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import rocket.jobrocketbackend.alarm.service.PushAlarmService;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentCountEntity;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;
import rocket.jobrocketbackend.board.free.repository.FreeBoardRepository;
import rocket.jobrocketbackend.board.free.repository.FreeCommentCountRepository;
import rocket.jobrocketbackend.board.free.repository.FreeCommentRepository;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class FreeBoardCommentCountTest {

    @Autowired
    private FreeBoardService freeBoardService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FreeBoardRepository freeBoardRepository;
    @Autowired
    private FreeCommentService freeCommentService;

    @MockitoBean
    private PushAlarmService pushAlarmService;


    @Autowired
    private FreeCommentRepository freeCommentRepository;
    @Autowired
    private FreeCommentCountRepository freeCommentCountRepository;

    @Test
    void increase() throws InterruptedException {
        //given

        UserEntity user = UserEntity.builder().nickname("닉네임").email("test@naver.com").role(Role.MEMBER).allowEmail(false).build();
        userRepository.save(user);
        FreeBoardResponse freeBoardResponse = freeBoardService.create(FreeBoardCreateRequest.builder().title("제목").content("내용").build(), "test@naver.com", LocalDate.now());
        Long boardId = freeBoardResponse.getId();
        Long userId = user.getId();

        ExecutorService executorService = Executors.newFixedThreadPool(20);
        CountDownLatch latch = new CountDownLatch(100);

        for(int i = 0; i < 100; i++){
            executorService.execute(()-> {
                try {
                    freeCommentService.create(FreeCreateCommentRequest.builder().content("임시").build(), boardId, userId);
                }finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executorService.shutdown();
        FreeCommentCountEntity result = freeCommentCountRepository.findFreeCommentCountByBoardId(boardId).orElseThrow(() -> new IllegalStateException("엔티티가 존재하지 않습니다."));
        assertThat(result.getCount()).isEqualTo(100);
    }

    @Test
    void decrease() throws InterruptedException {
        UserEntity user = UserEntity.builder().nickname("닉네임").email("test@gmail.com").role(Role.MEMBER).allowEmail(false).build();
        userRepository.save(user);
        FreeBoardResponse freeBoardResponse = freeBoardService.create(FreeBoardCreateRequest.builder().title("제목").content("내용").build(), "test@gmail.com", LocalDate.now());
        Long boardId = freeBoardResponse.getId();
        Long userId = user.getId();

        for (int i = 0; i < 100; i++) {
            freeCommentService.create(
                    FreeCreateCommentRequest.builder().content("임시").build(), boardId, userId);
        }
        FreeCommentCountEntity initial = freeCommentCountRepository.findFreeCommentCountByBoardId(boardId)
                .orElseThrow(() -> new IllegalStateException("엔티티가 존재하지 않습니다."));
        assertThat(initial.getCount()).isEqualTo(100);

        FreeBoardEntity board = freeBoardRepository.findById(boardId).orElseThrow(() -> new IllegalStateException("엔티티가 존재하지 않습니다."));
        List<FreeCommentEntity> commentList = freeCommentRepository.findByBoard(board);
        assertThat(commentList.size()).isEqualTo(100);

        ExecutorService executorService = Executors.newFixedThreadPool(20);
        CountDownLatch latch = new CountDownLatch(100);

        for (FreeCommentEntity comment : commentList) {
            Long commentId = comment.getCommentId();
            executorService.execute(() -> {
                try {
                    freeCommentService.delete(commentId, userId);
                } finally {
                    latch.countDown();
                }
            });
        }
        latch.await();
        executorService.shutdown();

        FreeCommentCountEntity result = freeCommentCountRepository.findFreeCommentCountByBoardId(boardId)
                .orElseThrow(() -> new IllegalStateException("엔티티가 존재하지 않습니다."));
        assertThat(result.getCount()).isEqualTo(0);
    }
}
