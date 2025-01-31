package rocket.jobrocketbackend.board.free.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.MethodArgumentNotValidException;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;
import rocket.jobrocketbackend.board.free.service.FreeCommentService;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.user.dto.UserDTO;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = FreeCommentController.class)
@WithMockUser
@ActiveProfiles("test")
class FreeCommentControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockitoBean
    private FreeCommentService freeCommentService;

    @BeforeEach
    void setup(){
        CustomOAuth2User principal = new CustomOAuth2User(new UserDTO(Role.MEMBER,"닉네임","","test@naver.com",1L));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @DisplayName("댓글 생성 요청")
    @Test
    void createComment() throws Exception {
        //given
        FreeCreateCommentRequest request = FreeCreateCommentRequest.builder().content("댓글 내용").build();
        FreeCommentEntity result = FreeCommentEntity.builder().content(request.getContent()).build();

        Mockito.when(freeCommentService.create(any(FreeCreateCommentRequest.class),anyLong(), anyLong())).thenReturn(result);

        mockMvc.perform(post("/board/free/1/comment")
                .content(objectMapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf())
        )
                .andDo(print())
                .andExpect(status().isCreated());
        Mockito.verify(freeCommentService).create(request,1L,1L);
    }

    @DisplayName("댓글내용이 공백일시 예외발생")
    @Test
    void createCommentException() throws Exception {
        //given
        FreeCreateCommentRequest request = FreeCreateCommentRequest.builder().content("").build();
        FreeCommentEntity result = FreeCommentEntity.builder().content(request.getContent()).build();

        Mockito.when(freeCommentService.create(any(FreeCreateCommentRequest.class),anyLong(), anyLong())).thenReturn(result);

        mockMvc.perform(post("/board/free/1/comment")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                )
                .andDo(print())
                .andExpect(exception -> assertTrue(exception.getResolvedException() instanceof MethodArgumentNotValidException))
                .andExpect(status().isBadRequest());

    }

    @Test
    void deleteComment() throws Exception {
        //given
        //when
        //then
        mockMvc.perform(delete("/board/free/1/comment/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                )
                .andDo(print())
                .andExpect(status().isNoContent());

        Mockito.verify(freeCommentService).delete(1L, 1L);
    }
}