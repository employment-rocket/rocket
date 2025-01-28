package rocket.jobrocketbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
//@EnableMongoRepositories(basePackages = "rocket.jobrocketbackend.profile.profile.repository")
public class JobRocketBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobRocketBackendApplication.class, args);
    }

}
