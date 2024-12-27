package rocket.jobrocketbackend.schedule.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class IllegalScheduleStateException extends RocketException {
    public IllegalScheduleStateException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
