package rocket.jobrocketbackend.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.answer.entity.AnswerEntity;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;
import rocket.jobrocketbackend.common.entity.SocialType;
import rocket.jobrocketbackend.user.request.UserEditReq;


import java.util.ArrayList;
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
    private String nickname;
    private String profile;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    private Boolean allowEmail=false;

    private String refreshToken;

    @Column(nullable = false)
    private Boolean allowAlarm=false;


    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnswerEntity> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IntroduceEntity> introduces = new ArrayList<>();

    @Builder
    public UserEntity(Long id, String email, String nickname, String profile, SocialType socialType, Role role, Boolean allowEmail, String refreshToken, Boolean allowAlarm) {
        this.id=id;
        this.email = email;
        this.nickname = nickname;
        this.profile = profile;
        this.socialType=socialType;
        this.allowEmail=allowEmail;
        this.role = role;
        this.refreshToken=refreshToken;
        this.allowAlarm=allowAlarm;
    }

    public void editInfo(UserEditReq memberEditReq){
        this.nickname = memberEditReq.getNickname();
        this.profile= memberEditReq.getProfile();
        this.allowEmail = memberEditReq.getAllowEmail();
        this.allowAlarm=memberEditReq.getAllowAlarm();
    }

    public UserEntity updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }
}
