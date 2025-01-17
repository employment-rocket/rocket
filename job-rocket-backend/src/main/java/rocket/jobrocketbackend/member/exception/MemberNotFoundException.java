package rocket.jobrocketbackend.member.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class MemberNotFoundException extends RocketException {
    public MemberNotFoundException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
