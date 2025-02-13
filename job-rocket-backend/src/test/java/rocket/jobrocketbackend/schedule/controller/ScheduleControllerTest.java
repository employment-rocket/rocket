package rocket.jobrocketbackend.schedule.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleCreateRequest;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleModifyTypeRequest;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleTypeModifyDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.service.ScheduleService;
import rocket.jobrocketbackend.user.dto.UserDTO;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ScheduleController.class)
@WithMockUser
class ScheduleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean("scheduleService")
    private ScheduleService scheduleService;


    @Test
    @DisplayName("요청하는 사용자의 일정관리를 타입별로 분류하여 map형태로 반환")
    void scheduleList() {
    }

    @Test
    @DisplayName("id에 해당하는 스케줄의 타입을 바꾼다.")
    void scheduleTypeModify() throws Exception {
        //given
        LocalDate date = LocalDate.of(2024, 12, 23);
        ScheduleModifyTypeRequest request = ScheduleModifyTypeRequest.builder().scheduleId(1L).type("First").build();
        ScheduleDTO result = ScheduleDTO.builder()
                .id(1L)
                .type(ScheduleType.FIRST)
                .dueDate(date)
                .memo("메모")
                .title("제목")
                .state(ScheduleState.PASSED)
                .build();
        when(scheduleService.modifyType(any(ScheduleTypeModifyDTO.class))).thenReturn(result);
        //when
        mockMvc.perform(
                        patch("/schedules")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(csrf())
                ).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.type").value(ScheduleType.FIRST.getText()));

    }

    @Test
    @DisplayName("신규 일정을 생성한다")
    void scheduleCreate() throws Exception {
        //given
        UserDTO dto = UserDTO.builder().id(1L).build();


        LocalDate date = LocalDate.of(2024, 12, 23);
        ScheduleCreateRequest request = ScheduleCreateRequest.builder()
                .title("제목")
                .memo("메모")
                .dueDate(date)
                .state("Ongoing")
                .build();
        ScheduleDTO result = ScheduleDTO.builder()
                .id(1L)
                .type(ScheduleType.DOCUMENT)
                .dueDate(date)
                .memo("메모")
                .title("제목")
                .state(ScheduleState.ONGOING)
                .build();
        when(scheduleService.create(any(ScheduleCreateDTO.class),anyLong())).thenReturn(result);
        //when
        //then
        mockMvc.perform(
                        post("/schedules")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(csrf())
                                .with(authentication(new UsernamePasswordAuthenticationToken(new CustomOAuth2User(dto),null, null)))
                )
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("scheduleId를 받아서 삭제 요청을 보낸다.")
    void scheduleDelete() throws Exception {
        // given
        // when
        // then
        mockMvc.perform(
                        delete("/schedules/1")
                                .with(csrf())
                ).andDo(print())
                .andExpect(status().isNoContent());
    }
}