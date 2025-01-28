package rocket.jobrocketbackend.board.free.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class AccessDeniedException extends RocketException {

    public AccessDeniedException() {
        super("본인의 게시글만 삭제할 수 있습니다.");
    }

    public AccessDeniedException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}
