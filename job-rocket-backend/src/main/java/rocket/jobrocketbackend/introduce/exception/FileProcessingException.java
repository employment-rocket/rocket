package rocket.jobrocketbackend.introduce.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class FileProcessingException extends RocketException {

    public FileProcessingException(String message) {
        super(message);
    }

    public FileProcessingException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public int getStatusCode() {
        return 500;
    }
}