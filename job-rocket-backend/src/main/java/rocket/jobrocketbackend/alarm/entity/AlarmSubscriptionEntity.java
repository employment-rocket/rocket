package rocket.jobrocketbackend.alarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.persistence.*;
import nl.martijndwars.webpush.Subscription;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.user.entity.UserEntity;

@Entity
@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AlarmSubscriptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private UserEntity user;

    @Column(columnDefinition = "TEXT")
    private String subscriptionJson;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public AlarmSubscriptionEntity(UserEntity user, String subscriptionJson) {
        this.user = user;
        this.subscriptionJson = subscriptionJson;
    }


    public Subscription getWebPushSubscription() {
        return convertJsonToWebPushSubscription(subscriptionJson);
    }

    private Subscription convertJsonToWebPushSubscription(String json) {
        try {
            return objectMapper.readValue(json, Subscription.class);  // nl.martijndwars.webpush.Subscription 역직렬화
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON을 WebPush.Subscription 객체로 변환하는 중 오류 발생", e);
        }
    }


    public static String convertSubscriptionToJson(Subscription subscription) {
        try {
            return objectMapper.writeValueAsString(subscription);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize subscription", e);
        }
    }


    public void updateSubscription(String subscriptionJson) {
        this.subscriptionJson = subscriptionJson;
    }


}
