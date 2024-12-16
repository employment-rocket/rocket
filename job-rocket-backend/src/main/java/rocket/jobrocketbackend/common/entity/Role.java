package rocket.jobrocketbackend.common.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    MANAGER, MEMBER;

    public String getKey(){
        return "ROLE_"+this.name();
    }
}
