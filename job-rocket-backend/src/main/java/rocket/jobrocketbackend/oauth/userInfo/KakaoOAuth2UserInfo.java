package rocket.jobrocketbackend.oauth.userInfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo{

    public KakaoOAuth2UserInfo(Map<String,Object> attributes){
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
        String response = ((Map<String,String>)attributes.get("profile")).get("profile_image_url");
        if (response == null) {
            return null;
        }
        return response;
    }
}
