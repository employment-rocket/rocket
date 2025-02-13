package rocket.jobrocketbackend.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.user.request.UserEditReq;
import rocket.jobrocketbackend.user.service.UserService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {

        Long memberId = customOAuth2User.getId();

            Map<String, Object> userProfile = userService.getUserProfile(memberId);
            return ResponseEntity.ok(userProfile);
    }


    @PostMapping("/file/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("userId") Long userId) throws IOException {

            userService.saveFile(file, userId);

            return ResponseEntity.ok("프로필 사진이 정상적으로 등록되었습니다");

    }


    @GetMapping("/file/upload")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) throws FileNotFoundException {
        byte[] imageBytes = userService.getImageBytes(customOAuth2User.getId());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
    }

    @PostMapping("/settings/email/{userId}")
    public ResponseEntity<String> updateAllowEmail(
            @PathVariable("userId") Long userId,
            @RequestBody UserEditReq request) {
        userService.updateAllowEmail(userId, request.getAllowEmail());
        return ResponseEntity.ok("이메일 유무 정상 등록.");
    }


}
