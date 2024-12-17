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

    private String username;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    private Boolean allowEmail=false;

    @Builder
    public UserEntity(Long id, String email, String nickname, String profile, String username, SocialType socialType, Role role, Boolean allowEmail) {
        this.id=id;
        this.email = email;
        this.nickname = nickname;
        this.profile = profile;
        this.username=username;
        this.socialType=socialType;
        this.allowEmail=allowEmail;
        this.role = role;
    }


}
