package rocket.jobrocketbackend.user.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class UserNotFoundException extends RocketException {
    public UserNotFoundException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
