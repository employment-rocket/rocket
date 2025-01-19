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
    private Role role;
    private String nickname;
    private String profile;
    private String email;
    private Long id;

    public UserDTO(Role role, String nickname, String profile, String email, Long id) {
        this.role=role;
        this.nickname=nickname;
        this.profile=profile;
        this.email=email;
        this.id=id;
    }
    public static UserDTO from(UserEntity userEntity){
        return UserDTO.builder()
                .role(userEntity.getRole())
                .nickname(userEntity.getNickname())
                .email(userEntity.getEmail())
                .profile(userEntity.getProfile())
                .id(userEntity.getId())
                .build();
    }
}
