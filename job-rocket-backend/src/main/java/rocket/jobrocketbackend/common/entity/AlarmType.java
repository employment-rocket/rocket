package rocket.jobrocketbackend.common.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AlarmType {
    SCHEDULE("SCHEDULE"),
    COMMENT("COMMENT");

    private final String type;
}