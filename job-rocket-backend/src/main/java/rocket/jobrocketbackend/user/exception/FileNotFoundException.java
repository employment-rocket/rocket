package rocket.jobrocketbackend.user.exception;


import rocket.jobrocketbackend.common.exception.RocketException;

public class FileNotFoundException extends RocketException {
    public FileNotFoundException(String message) {
        super(message);
    }

  @Override
  public int getStatusCode() {
    return 404;
  }
}
