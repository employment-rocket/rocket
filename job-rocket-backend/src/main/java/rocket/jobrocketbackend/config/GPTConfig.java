package rocket.jobrocketbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class GPTConfig {

    @Value("${gpt.api.key}")
    private String apiKey;

    @Bean(name = "gptRestTemplate")
    public RestTemplate gptRestTemplate() {
        RestTemplate gptRestTemplate = new RestTemplate();
        gptRestTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("Authorization", "Bearer " + apiKey);
            return execution.execute(request, body);
        });
        return gptRestTemplate;
    }
}