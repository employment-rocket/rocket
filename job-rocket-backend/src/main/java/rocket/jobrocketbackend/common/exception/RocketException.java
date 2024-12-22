package rocket.jobrocketbackend.common.exception;

import lombok.Getter;

import java.util.Map;
import java.util.HashMap;


@Getter
public abstract class RocketException extends RuntimeException{

    private final Map<String,String> validation = new HashMap<>();

    public RocketException(String message) {
        super(message);
    }

    public RocketException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract int getStatusCode();

    public void addValidation(String fieldName, String value) {
        validation.put(fieldName,value);
    }
}

