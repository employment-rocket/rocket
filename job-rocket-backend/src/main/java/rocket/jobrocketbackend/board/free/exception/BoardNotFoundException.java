package rocket.jobrocketbackend.board.free.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class BoardNotFoundException extends RocketException {

    public BoardNotFoundException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
