package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.dto.ScheduleRateDto;
import rocket.jobrocketbackend.schedule.service.StatisticsService;

import java.util.List;
import java.util.Map;

@RequestMapping("/schedules")
@RequiredArgsConstructor
@RestController
@Slf4j
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/statictics")
    public Map<String,Long> statisticsByStateAndTypeList(@AuthenticationPrincipal CustomOAuth2User user){
        Map<String, Long> result = statisticsService.getStatisticsByStateAndType(user.getId());
        ScheduleRateDto rate = statisticsService.getPassRate(user.getId());
        result.put("documentPassRate",rate.getDocumentPassRate());
        result.put("firstPassRate", rate.getFirstPassRate());
        result.put("secondPassRate", rate.getSecondPassRate());
        result.put("finalPassRate", rate.getFinalPassRate());
        return result;
    }
}
