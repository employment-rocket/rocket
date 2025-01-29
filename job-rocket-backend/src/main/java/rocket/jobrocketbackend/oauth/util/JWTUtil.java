
package rocket.jobrocketbackend.oauth.util;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
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

    public String createAccessToken(String email, Long userId) {

        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken(String email, Long userId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId",userId)
                .setExpiration(new Date(System.currentTimeMillis() + (expiration * 168)))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String newAccessToken(String refreshToken){

        if(isExpired(refreshToken)){
            throw new RuntimeException("Refresh token has expired");
        }
        JWTCreateDto jwtCreateDto = getMemberEmailAndId(refreshToken, secretKey);

        return createAccessToken(jwtCreateDto.email(), jwtCreateDto.userId());
    }


    public boolean isExpired(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(jwtToken);
            return claims.getBody().getExpiration().before(new Date());
        }catch (ExpiredJwtException e){
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    public UserDTO getUserDto(String jwtToken){
        JWTCreateDto jwtCreateDto = getMemberEmailAndId(jwtToken, secretKey);
        String email = jwtCreateDto.email();
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
        return UserDTO.from(userEntity);
    }

    public static JWTCreateDto getMemberEmailAndId(String token, String secretKey) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return new JWTCreateDto(claims.getSubject(), claims.get("userId", Long.class));
    }
}

