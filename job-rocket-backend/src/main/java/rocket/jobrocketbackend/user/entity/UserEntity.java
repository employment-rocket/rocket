package rocket.jobrocketbackend.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.common.entity.SocialType;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;
import rocket.jobrocketbackend.note.entity.ConversationEntity;
import rocket.jobrocketbackend.note.entity.NoteEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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


    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConversationEntity> conversations = new ArrayList<>();

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NoteEntity> notes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnswerEntity> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IntroduceEntity> introduces = new ArrayList<>();

    @Builder
    public UserEntity(Long id, String email, String nickname, String profile, SocialType socialType, Role role, Boolean allowEmail, String refreshToken) {
        this.id=id;
        this.email = email;
        this.nickname = nickname;
        this.profile = profile;
        this.socialType=socialType;
        this.allowEmail=allowEmail;
        this.role = role;
        this.refreshToken=refreshToken;

    }

    public UserEntity updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public UserEntity updateAllowEmail(Boolean allowEmail){
        this.allowEmail=allowEmail;
        return this;
    }

    public UserEntity updateProfileImage(String profileImage){
        this.profile=profileImage;
        return this;
    }

}
