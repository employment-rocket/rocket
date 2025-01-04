
package rocket.jobrocketbackend.oauth.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import rocket.jobrocketbackend.common.entity.Role;
import rocket.jobrocketbackend.user.dto.UserDTO;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.util.Date;

@RequiredArgsConstructor
@Component
@Slf4j
public class JWTUtil {

    private final UserRepository userRepository;

    @Value("${spring.jwt.secret}")
    private String secretKey;

    @Value("${spring.jwt.expiration}")
    private Long expiration;

    public String createAccessToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken() {
        return Jwts.builder()
                //.setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + (expiration * 2)))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    //refreshToken으로 AccessToken 재발급
    public String newAccessToken(String refreshToken){
        if(isExpired(refreshToken)){
            throw new RuntimeException("Refresh token has expired");
        }
        String email = getMemberEmail(refreshToken, secretKey);
        return createAccessToken(email);
    }


    public boolean isExpired(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(jwtToken);
            return claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public UserDTO getUserDto(String jwtToken){
        String email = getMemberEmail(jwtToken,secretKey);
        log.info("email = {}", email);
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
        return UserDTO.from(userEntity);
    }

    public static String getMemberEmail(String token, String secretKey) {
        Claims body = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        return Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token)
                .getBody().get("sub", String.class);
    }
}

