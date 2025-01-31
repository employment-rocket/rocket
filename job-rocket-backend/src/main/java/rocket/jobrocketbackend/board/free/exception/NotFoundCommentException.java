package rocket.jobrocketbackend.board.free.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class NotFoundCommentException extends RocketException {

    public NotFoundCommentException() {
        super("해당 댓글이 존재하지 않습니다.");
    }

    public NotFoundCommentException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
