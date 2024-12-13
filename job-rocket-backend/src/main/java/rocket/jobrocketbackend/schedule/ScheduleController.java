package rocket.jobrocketbackend.schedule;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.schedule.response.MockDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {


    @GetMapping()
    public Map<String ,List<MockDto>> mockData(){
        HashMap<String, List<MockDto>> response = new HashMap<>();
        response.put("document", MockDto.getDocumentTypeMocks());
        response.put("first", MockDto.getFirstTypeMocks());
        response.put("second", MockDto.getSecondTypeMocks());
        response.put("final", MockDto.getFinalTypeMocks());
        return response;
    }
}
