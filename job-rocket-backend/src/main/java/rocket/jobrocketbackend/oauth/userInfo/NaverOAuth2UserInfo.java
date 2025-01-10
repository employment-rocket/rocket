package rocket.jobrocketbackend.oauth.userInfo;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo{
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return null;
    }

    @Override
    public String getEmail() {
        String response  =  (String)attributes.get("email");

        if (response == null) {
            return null;
        }

        return response;
    }

    @Override
    public String getNickname() {
        return null;
    }

    @Override
    public String getProfileImage() {
        String response  =  (String)attributes.get("profile_image");

        if (response == null) {
            return null;
        }

        return response;
    }
}
