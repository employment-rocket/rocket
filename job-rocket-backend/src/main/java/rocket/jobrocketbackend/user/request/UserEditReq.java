package rocket.jobrocketbackend.user.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserEditReq {

    private Boolean allowEmail;
    private Boolean allowAlarm;

}
