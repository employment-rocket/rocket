package rocket.jobrocketbackend.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.member.entity.MemberEntity;

@Getter
@RequiredArgsConstructor
@Builder
public class MemberDTO {
    private Role role;
    private String nickname;
    private String profile;
    private String email;
    private Long id;

    public MemberDTO(Role role, String nickname, String profile, String email, Long id) {
        this.role=role;
        this.nickname=nickname;
        this.profile=profile;
        this.email=email;
        this.id=id;
    }
    public static MemberDTO from(MemberEntity userEntity){
        return MemberDTO.builder()
                .role(userEntity.getRole())
                .nickname(userEntity.getNickname())
                .email(userEntity.getEmail())
                .profile(userEntity.getProfile())
                .id(userEntity.getId())
                .build();
    }
}
