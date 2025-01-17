
package rocket.jobrocketbackend.oauth.util;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import rocket.jobrocketbackend.member.dto.MemberDTO;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.repository.MemberRepository;

import java.util.Date;

@RequiredArgsConstructor
@Component
@Slf4j
public class JWTUtil {

    private final MemberRepository memberRepository;

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

    public String createRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + (expiration * 2)))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

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
        }catch (ExpiredJwtException e){
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    public MemberDTO getUserDto(String jwtToken){
        String email = getMemberEmail(jwtToken,secretKey);
        MemberEntity userEntity = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
        return MemberDTO.from(userEntity);
    }

    public static String getMemberEmail(String token, String secretKey) {

        return Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token)
                .getBody().get("sub", String.class);
    }
}

