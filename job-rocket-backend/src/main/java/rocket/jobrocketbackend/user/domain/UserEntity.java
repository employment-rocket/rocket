package rocket.jobrocketbackend.user.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.common.entity.Role;

@Entity
@Getter
@NoArgsConstructor
@Table(name="member")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String nickname;
    private String profile;
    private String setemail;
    private String refreshToken;

    @Builder
    public UserEntity(Long id, String email, Role role, String nickname, String profile, Boolean setemail, String refreshToken){
        this.id=id;
        this.email=email;
        this.role=role;
        this.nickname=nickname;
        this.profile=profile;
        this.setemail= String.valueOf(setemail);
        this.refreshToken=refreshToken;
    }
}
