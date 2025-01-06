package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.service.StatisticsService;

import java.util.List;
import java.util.Map;

@RequestMapping("/schedules")
@RequiredArgsConstructor
@RestController
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/statictics")
    public Map<String,Long> statisticsByStateAndTypeList(){
        Long userId = 1L;
        Map<String, Long> result = statisticsService.getStatisticsByStateAndType(userId);
        result.put("DocumentFail",statisticsService.getDocumentFailCount(userId));
        return result;
    }
}
