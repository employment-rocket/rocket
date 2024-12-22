package rocket.jobrocketbackend.oauth.service;

import rocket.jobrocketbackend.oauth.token.OAuthToken;

public interface OAuthService {

    OAuthToken getToken(String code);
}
