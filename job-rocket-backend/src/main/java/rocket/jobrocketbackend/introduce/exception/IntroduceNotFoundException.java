package rocket.jobrocketbackend.introduce.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class IntroduceNotFoundException extends RocketException {
    public IntroduceNotFoundException(String message) {
        super(message);
    }

    public IntroduceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
