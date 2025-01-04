package rocket.jobrocketbackend.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.common.entity.SocialType;

import java.util.Optional;

import java.util.List;

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

    @Column(nullable = false)
    private Boolean allowEmail=false;

    private String refreshToken;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnswerEntity> answers;

    @Builder
    public UserEntity(Long id, String email, String nickname, String profile, SocialType socialType, Role role, Boolean allowEmail,String refreshToken) {
        this.id=id;
        this.email = email;
        this.nickname = nickname;
        this.profile = profile;
        this.socialType=socialType;
        this.allowEmail=allowEmail;
        this.role = role;
        this.refreshToken=refreshToken;
    }



    public UserEntity update(String nickname, String profile) {
        if (!this.nickname.equals(nickname)) {
            this.nickname = nickname;
        }
        if (!this.profile.equals(profile)) {
            this.profile = profile;
        }
        return this;
    }

    public UserEntity updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

}
