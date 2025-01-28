package rocket.jobrocketbackend.board.free.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.board.free.service.FreeBoardService;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.user.dto.UserDTO;
import rocket.jobrocketbackend.user.service.UserService;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FreeBoardController.class)
@WithMockUser
class FreeBoardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private FreeBoardService freeBoardService;

    @MockitoBean
    private UserService userService;

    @BeforeEach
    void init(){
        CustomOAuth2User principal = new CustomOAuth2User(new UserDTO(Role.MEMBER,"닉네임","","test@naver.com",1L));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


    @Test
    void getFreeBoardList() {
        //given
        //when
        //then
    }

    @Test
    void getFreeBoard() {
        //given
        //when
        //then
    }

    @Test
    void createFreeBoard() throws Exception {
        //given
        FreeBoardCreateRequest request = FreeBoardCreateRequest.builder().title("제목").content("내용").build();
        FreeBoardResponse result = FreeBoardResponse.builder().id(1L).nickName("닉네임").postDate(LocalDate.now()).title("제목")
                .content("내용").build();
        //when
        when(freeBoardService.create(any(FreeBoardCreateRequest.class), any(String.class), any(LocalDate.class))).thenReturn(result);
        //then
        mockMvc.perform(
                post("/board/free")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
        )
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("제목"))
                .andExpect(jsonPath("$.content").value("내용"))
                .andExpect(jsonPath("$.nickName").value("닉네임"))
                .andExpect(jsonPath("$.id").value(1L));
    }
}