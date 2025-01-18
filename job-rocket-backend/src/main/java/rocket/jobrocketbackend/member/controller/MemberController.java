package rocket.jobrocketbackend.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.member.request.MemberEditReq;
import rocket.jobrocketbackend.member.service.MemberService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.io.FileNotFoundException;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        if (customOAuth2User == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication is missing");
        }
        Long memberId = customOAuth2User.getId();

        try {
            Map<String, Object> userProfile = memberService.getUserProfileById(memberId);
            return ResponseEntity.ok(userProfile);

        } catch (Exception e) {
            log.error("Error fetching user profile: ", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/mypage/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable("userId") Long id) {
        try {
            Map<String, Object> getMypageUserProfile = memberService.getUserProfile(id);
            return ResponseEntity.ok(getMypageUserProfile);

        } catch (Exception e) {
            log.error("Error fetching user profile: ", e);
            throw new RuntimeException("User profile not found");
        }
    }

    @PostMapping("/mypage/{userId}")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable("userId") Long userId,
            @RequestBody MemberEditReq memberEditReq) {
        try {
            memberService.updateUserProfile(userId, memberEditReq);
            return ResponseEntity.ok("프로필이 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            log.error("Error updating user profile: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("프로필 업데이트 실패");
        }
    }

    @PostMapping("/file/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("userId") Long userId) {
        try {
            memberService.saveFile(file, userId);
            return ResponseEntity.ok("프로필 사진이 정상적으로 등록되었습니다");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        }
    }


    @GetMapping("/uploads/{userId}")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@PathVariable("userId") Long userId) {
        try {
            byte[] imageBytes = memberService.getImageBytes(userId);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);
        } catch (FileNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



}
