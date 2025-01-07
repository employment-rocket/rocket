package rocket.jobrocketbackend.introduce.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class GPTProcessingException extends RocketException {

    public GPTProcessingException(String message) {
        super(message);
    }

    public GPTProcessingException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public int getStatusCode() {
        return 500;
    }
}
