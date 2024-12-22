
package rocket.jobrocketbackend.oauth.util;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.user.dto.UserDTO;
import rocket.jobrocketbackend.common.entity.Role;

import java.io.IOException;
@Slf4j
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 쿠키들을 불러온 뒤 Authorization Key에 담긴 쿠키를 찾음
        String token = request.getHeader("Authorization");
        log.info("token = {}", token);
        // Authorization 헤더 검증
        if (token == null) {
            System.out.println("token null");
            filterChain.doFilter(request, response);
            return; // 조건이 해당되면 메소드 종료 (필수)
        }

        // 토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {
            System.out.println("token expired");
            filterChain.doFilter(request, response);
            return; // 조건이 해당되면 메소드 종료 (필수)
        }


        // UserDTO를 생성하여 값 set
        UserDTO userDTO = jwtUtil.getUserDto(token);

        // UserDetails에 회원 정보 객체 담기
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDTO);

        // 스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        // 세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
