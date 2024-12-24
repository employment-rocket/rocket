package rocket.jobrocketbackend.schedule.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import rocket.jobrocketbackend.schedule.controller.request.ScheduleCreateRequest;
import rocket.jobrocketbackend.schedule.dto.ScheduleCreateDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.entity.ScheduleState;
import rocket.jobrocketbackend.schedule.entity.ScheduleType;
import rocket.jobrocketbackend.schedule.service.ScheduleService;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
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
    void getScheduleList() {
    }

    @Test
    @DisplayName("신규 일정을 생성한다")
    void createSchedule() throws Exception {
        //given
        LocalDate date = LocalDate.of(2024, 12, 23);
        ScheduleCreateRequest request = ScheduleCreateRequest.builder()
                .title("제목")
                .memo("메모")
                .dueDate(date)
                .state("Ongoing")
                .build();
        ScheduleDTO result = ScheduleDTO.builder()
                .id(1L)
                .type(ScheduleType.Document)
                .dueDate(date)
                .memo("메모")
                .title("제목")
                .state(ScheduleState.Ongoing)
                .build();
        when(scheduleService.createScheduleFrom(any(ScheduleCreateDTO.class))).thenReturn(result);
        //when
        //then
        mockMvc.perform(
                        post("/schedule")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(csrf())
                )
                .andDo(print())
                .andExpect(status().isCreated());
    }
}