package rocket.jobrocketbackend.user.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserEditReq {

    private String nickname;
    private String profile;
    private Boolean allowEmail;
    private Boolean allowAlarm;

    @Builder
    public UserEditReq(String nickname, String profile, Boolean allowAlarm, Boolean allowEmail) {
        this.nickname=nickname;
        this.profile=profile;
        this.allowAlarm=allowAlarm;
        this.allowEmail=allowEmail;
    }


}
