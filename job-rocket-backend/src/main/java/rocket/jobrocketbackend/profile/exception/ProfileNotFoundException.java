package rocket.jobrocketbackend.profile.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class ProfileNotFoundException extends RocketException {

	public ProfileNotFoundException(String message) {
		super(message);
	}

	@Override
	public int getStatusCode() {
		return 404;
	}
}