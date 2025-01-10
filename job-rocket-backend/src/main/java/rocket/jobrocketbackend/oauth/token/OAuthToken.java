package rocket.jobrocketbackend.oauth.token;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthToken {
    private String accessToken;
    private String refreshToken;

    @Builder
    public OAuthToken(String accessToken,String refreshToken){
        this.accessToken=accessToken;
        this.refreshToken=refreshToken;
    }
}
