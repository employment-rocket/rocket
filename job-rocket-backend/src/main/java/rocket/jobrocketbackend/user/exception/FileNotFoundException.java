package rocket.jobrocketbackend.user.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import rocket.jobrocketbackend.common.exception.RocketException;


@ResponseStatus(HttpStatus.NOT_FOUND)
public class FileNotFoundException extends RocketException {
    public FileNotFoundException(String message) {
        super(message);
    }

  @Override
  public int getStatusCode() {
    return 404;
  }
}
