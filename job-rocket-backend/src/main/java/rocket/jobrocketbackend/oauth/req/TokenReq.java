package rocket.jobrocketbackend.oauth.req;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TokenReq {
    private String grantType;
    private String clientId;
    private String redirectUri;
    private String code;
    private String clientSecret;

    @Builder
    public TokenReq(String grantType, String clientId, String redirectUri, String code, String clientSecret) {
        this.grantType = grantType;
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.code = code;
        this.clientSecret = clientSecret;
    }
}