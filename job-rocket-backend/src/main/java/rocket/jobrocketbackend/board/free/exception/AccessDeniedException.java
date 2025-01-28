package rocket.jobrocketbackend.board.free.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class AccessDeniedException extends RocketException {
    public AccessDeniedException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}
