package rocket.jobrocketbackend.common.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Category {
    CS("CS"),
    PERSONAL("PERSONAL"),
    COMPANY("COMPANY"),
    INTRODUCE("INTRODUCE"),
    REVIEW("REVIEW");

    private final String name;
}

