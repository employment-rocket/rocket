package rocket.jobrocketbackend.answer.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class AnswerNotFoundException extends RocketException {
    public AnswerNotFoundException(String message) {
        super(message);
    }

    public AnswerNotFoundException(Long answerId) {
        super("Answer not found for ID: " + answerId);
        addValidation("answerId", String.valueOf(answerId));
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
