package rocket.jobrocketbackend.aouth.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rocket.jobrocketbackend.common.entity.Role;

@Getter
@RequiredArgsConstructor
public class UserDTO {
    private Role role;       // ROLE_MEMBER 등 역할
    private String nickname;   // 사용자 닉네임
    private String profile;    // 프로필 사진 URL
    private String email;      // 사용자 이메일
    private String username;   // 서버에서 생성하는 사용자 고유 ID

    public UserDTO(Role role, String nickname, String profile, String email, String username) {
        this.role=role;
        this.nickname=nickname;
        this.profile=profile;
        this.email=email;
        this.username=username;
    }
}
