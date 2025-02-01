package rocket.jobrocketbackend.user.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class UserNotFoundException extends RocketException {

    public UserNotFoundException() {
        super("존재하지 않는 회원입니다.");
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
