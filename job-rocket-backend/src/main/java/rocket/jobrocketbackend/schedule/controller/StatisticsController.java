package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
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
    public Map<String,Long> statisticsByStateAndTypeList(@AuthenticationPrincipal CustomOAuth2User user){
        Map<String, Long> result = statisticsService.getStatisticsByStateAndType(user.getId());
        result.put("DocumentFail",statisticsService.getDocumentFailCount(user.getId()));
        return result;
    }
}
