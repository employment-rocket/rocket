package rocket.jobrocketbackend.oauth.userInfo;

import java.util.Map;
import java.util.Objects;

public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getId();  // 소셜 서비스의 고유한 사용자 ID

    public abstract String getEmail();  // 이메일 정보

    public abstract String getNickname();  // 닉네임 정보 (옵션)

    public abstract String getProfileImage();  // 프로필 이미지 URL (옵션)
}