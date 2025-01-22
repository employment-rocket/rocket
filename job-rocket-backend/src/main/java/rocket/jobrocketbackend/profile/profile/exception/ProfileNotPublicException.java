package rocket.jobrocketbackend.profile.profile.exception;

import rocket.jobrocketbackend.common.exception.RocketException;

public class ProfileNotPublicException extends RocketException {

	public ProfileNotPublicException(String message) {
		super(message);
	}

	@Override
	public int getStatusCode() {
		return 400;
	}
}
