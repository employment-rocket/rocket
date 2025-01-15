package rocket.jobrocketbackend.board.free.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import rocket.jobrocketbackend.board.free.service.FreeBoardService;
import rocket.jobrocketbackend.user.service.UserService;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(FreeBoardController.class)
@WithMockUser
class FreeBoardEntityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private FreeBoardService freeBoardService;

    @MockitoBean
    private UserService userService;

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
    void createFreeBoard() {
        //given
        //when
        //then
    }
}