package rocket.jobrocketbackend;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @Value("${my.name}")
    private String configTest;

    @PostConstruct
    public void init(){

    }

}
