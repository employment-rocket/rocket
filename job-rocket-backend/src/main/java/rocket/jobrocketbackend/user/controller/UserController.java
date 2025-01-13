package rocket.jobrocketbackend.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication){
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication is missing");
        }
        String nickname = authentication.getName();
        Optional<UserEntity> user = userRepository.findByNickname(nickname);

        if(user.isPresent()){
            return ResponseEntity.ok(Map.of("nickname", nickname));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

}
