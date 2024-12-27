package rocket.jobrocketbackend.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.common.entity.Role;

import java.util.List;

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
    private Boolean allowEmail;
    private String refreshToken;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnswerEntity> answers;

    @Builder
    public UserEntity(Long id, String email, Role role, String nickname, String profile, Boolean allowEmail, String refreshToken){
        this.id=id;
        this.email=email;
        this.role=role;
        this.nickname=nickname;
        this.profile=profile;
        this.allowEmail=allowEmail;
        this.refreshToken=refreshToken;
    }
}
