package rocket.jobrocketbackend.schedule.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class IllegalScheduleTypeException extends RocketException {
    public IllegalScheduleTypeException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
