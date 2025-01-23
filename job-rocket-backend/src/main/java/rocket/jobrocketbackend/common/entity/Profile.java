package rocket.jobrocketbackend.common.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Profile {
    DEFAULT("default.png");
    private final String fileName;
}