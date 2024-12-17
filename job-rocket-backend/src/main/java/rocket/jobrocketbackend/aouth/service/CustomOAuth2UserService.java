package rocket.jobrocketbackend.aouth.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.aouth.dto.*;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.common.entity.SocialType;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {


    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        System.out.println(oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());

        } else if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());

        } else {

            return null;
        }

        //추후 작성
        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
        UserEntity existData = userRepository.findByUsername(username);

        if(existData==null){
            UserEntity userEntity = UserEntity.builder()
            .username(username)
                    .email(oAuth2Response.getEmail())
                    .nickname(oAuth2Response.getNickname())
                    .profile(oAuth2Response.getProfile())
                    .role(Role.MEMBER)
                    .socialType(SocialType.valueOf(oAuth2Response.getProvider().toUpperCase()))
            .build();
            userRepository.save(userEntity);

            UserDTO userDTO = new UserDTO(userEntity.getRole(),
                    userEntity.getNickname(),
                    userEntity.getProfile(),
                    userEntity.getEmail(),
                    userEntity.getUsername());
            return new CustomOAuth2User(userDTO);
        }
        else{
            UserEntity updatedEntity = UserEntity.builder()
                    .id(existData.getId())
                    .username(existData.getUsername())
                    .email(oAuth2Response.getEmail())
                    .nickname(oAuth2Response.getNickname())
                    .profile(oAuth2Response.getProfile())
                    .role(existData.getRole())
                    .socialType(existData.getSocialType())
                    .allowEmail(existData.getAllowEmail())
                    .build();
            userRepository.save(updatedEntity);

            UserDTO userDTO = new UserDTO(updatedEntity.getRole(),
                    updatedEntity.getNickname(),
                    updatedEntity.getProfile(),
                    updatedEntity.getEmail(),
                    updatedEntity.getUsername());
            return new CustomOAuth2User(userDTO);
        }
    }
}