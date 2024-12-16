package rocket.jobrocketbackend.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.common.entity.SocialType;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "member")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;
    private String nickname;
    private String profile;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean allowEmail;

    @Builder
    public UserEntity(String email, String nickname, String profile, SocialType socialType, Role role, Boolean allowEmail) {
        this.email = email;
        this.nickname = nickname;
        this.profile = profile;
        this.socialType=socialType;
        this.allowEmail=allowEmail;
        this.role = role;
    }

    public UserEntity oAuthInfoUpdate(String nickname) {
        this.nickname = nickname;
        return this;
    }
}
