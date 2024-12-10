package rocket.jobrocketbackend.schedule;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.schedule.response.MockResponse;

import java.util.List;

@RestController("/schedule")
public class ScheduleController {

    @GetMapping("/")
    public List<MockResponse> mockData(){
        return null;
    }
}
