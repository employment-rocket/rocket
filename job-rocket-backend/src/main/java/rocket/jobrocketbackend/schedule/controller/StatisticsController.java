package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.service.StatisticsService;

import java.util.List;

@RequestMapping("/schedules")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/statictics")
    public List<ScheduleGroupDTO> statisticsByStateAndTypeList(){
        Long userId = 1L;
        List<ScheduleGroupDTO> list = statisticsService.getStatisticsByStateAndType(userId);
        return list;
    }
}
