package rocket.jobrocketbackend.oauth.dto;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import rocket.jobrocketbackend.member.dto.MemberDTO;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final MemberDTO memberDTO;

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(() -> String.valueOf(memberDTO.getRole()));
        return collection;
    }

    @Override
    public String getName() {
        return memberDTO.getNickname();
    }
    public String getEmail() {
        return memberDTO.getEmail();
    }

    public String getProfile() {
        return memberDTO.getProfile();
    }
}
