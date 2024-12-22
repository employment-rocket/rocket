package rocket.jobrocketbackend.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.user.entity.UserEntity;

@Getter
@RequiredArgsConstructor
@Builder
public class UserDTO {
    private Role role;       // ROLE_MEMBER 등 역할
    private String nickname;   // 사용자 닉네임
    private String profile;    // 프로필 사진 URL
    private String email;      // 사용자 이메일

    public UserDTO(Role role, String nickname, String profile, String email) {
        this.role=role;
        this.nickname=nickname;
        this.profile=profile;
        this.email=email;
    }
    public static  UserDTO from(UserEntity userEntity){
        return UserDTO.builder()
                .role(userEntity.getRole())
                .nickname(userEntity.getNickname())
                .email(userEntity.getEmail())
                .profile(userEntity.getProfile())
                .build();
    }
}
