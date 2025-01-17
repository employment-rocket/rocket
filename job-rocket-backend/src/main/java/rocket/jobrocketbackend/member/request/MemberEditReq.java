package rocket.jobrocketbackend.member.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.member.entity.MemberEntity;

@Getter
@NoArgsConstructor
public class MemberEditReq {

    private String nickname;
    private String profile;
    private Boolean allowEmail;
    private Boolean allowAlarm;

    @Builder
    public MemberEditReq(String nickname, String profile, Boolean allowAlarm, Boolean allowEmail) {
        this.nickname=nickname;
        this.profile=profile;
        this.allowAlarm=allowAlarm;
        this.allowEmail=allowEmail;
    }


}
