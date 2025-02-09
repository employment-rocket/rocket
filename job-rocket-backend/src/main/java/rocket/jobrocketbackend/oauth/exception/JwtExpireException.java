package rocket.jobrocketbackend.oauth.exception;

import org.springframework.security.core.AuthenticationException;

public class JwtExpireException extends AuthenticationException {

    public JwtExpireException(String msg) {
        super(msg);
    }

}
