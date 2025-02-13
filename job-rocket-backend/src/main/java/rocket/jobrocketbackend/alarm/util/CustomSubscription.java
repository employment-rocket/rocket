package rocket.jobrocketbackend.alarm.util;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import nl.martijndwars.webpush.Subscription;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomSubscription extends Subscription {
}

