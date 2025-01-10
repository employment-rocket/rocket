package rocket.jobrocketbackend;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TestController {

    @Value("${my.name}")
    String test;
    @PostConstruct
    public void init() {
        log.info("test = {}",test);
    }

    @GetMapping("/")
    public String test() {
        return test;
    }

    @GetMapping("/career")
    public String test2(){
        return "test2";
    }
}
