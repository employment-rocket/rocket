package rocket.jobrocketbackend.schedule.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class ScheduleNotFoundException extends RocketException {

    public ScheduleNotFoundException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 403;
    }
}
