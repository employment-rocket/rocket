package rocket.jobrocketbackend.alarm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.Map;

@Service
public class PushAlarmService {

    private PushService pushService;

    @Value("${vapid.public.key}")
    private String publicKey;

    @Value("${vapid.private.key}")
    private String privateKey;

    @PostConstruct
    public void init() {
        try {
            Security.addProvider(new BouncyCastleProvider());
            this.pushService = new PushService(publicKey, privateKey);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException("PushService 초기화 중 오류 발생", e);
        }
    }

    public void sendPushNotification(Subscription subscription, String title, String message, String url) {
        try {
            String payload = new ObjectMapper().writeValueAsString(Map.of("title", title, "body", message, "url", url));
            Notification notification = new Notification(subscription, payload);
            pushService.send(notification);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
