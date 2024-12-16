package rocket.jobrocketbackend.common.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    MEMBER("ROLE_MEMBER"), MANAGER("ROLE_MANAGER");

    private final String key;
}
