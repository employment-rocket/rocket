package rocket.jobrocketbackend.answer.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class UserNotFoundException extends RocketException {
    public UserNotFoundException(Long memberId) {
        super("User not found for ID: " + memberId);
        addValidation("memberId", String.valueOf(memberId));
    }

    @Override
    public int getStatusCode() {
        return 404;

    }
}
