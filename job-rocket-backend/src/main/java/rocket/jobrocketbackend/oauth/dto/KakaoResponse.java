/*
package rocket.jobrocketbackend.oauth.dto;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {

    private final Map<String, Object> attributes; // 원본 데이터
    private final Map<String, Object> kakaoAccount; // "kakao_account" 키 아래 데이터
    private final Map<String, Object> profile; // "profile" 키 아래 데이터

    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.profile = (Map<String, Object>) kakaoAccount.get("profile");
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        // 이메일은 kakao_account 내에 포함되어 있습니다.
        return kakaoAccount.get("email") != null ? kakaoAccount.get("email").toString() : null;
    }

    @Override
    public String getNickname() {
        // 닉네임은 profile 내에 포함되어 있습니다.
        return profile.get("nickname").toString();
    }

    @Override
    public String getProfile() {
        // 프로필 이미지 URL은 profile 내에 포함되어 있습니다.
        return profile.get("profile_image_url") != null ? profile.get("profile_image_url").toString() : null;
    }
}
*/