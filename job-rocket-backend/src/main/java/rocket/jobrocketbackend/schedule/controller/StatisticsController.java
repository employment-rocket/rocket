package rocket.jobrocketbackend.schedule.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.schedule.service.StatisticsService;

@RestController
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;



}
