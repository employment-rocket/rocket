package rocket.jobrocketbackend.aouth.dto;

public interface OAuth2Response {

    String getProvider();
    String getProviderId();
    String getEmail();
    String getNickname();
    String getProfile();
}
