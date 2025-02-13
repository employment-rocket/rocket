package rocket.jobrocketbackend.introduce.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.introduce.dto.response.IntroduceResDto;
import rocket.jobrocketbackend.introduce.service.IntroduceService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.List;

@RestController
@RequestMapping("/introduces")
@RequiredArgsConstructor
public class IntroduceController {
    private final IntroduceService introduceService;

    @GetMapping
    public ResponseEntity<List<IntroduceResDto>> getIntroduceList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        List<IntroduceResDto> response = introduceService.getIntroduceList(memberId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload")
    public ResponseEntity<IntroduceResDto> uploadIntroduce(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        IntroduceResDto response = introduceService.saveIntroduce(file, memberId, name);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{introduceId}")
    public ResponseEntity<Void> deleteIntroduce(@PathVariable Long introduceId) {
        introduceService.deleteIntroduceById(introduceId);
        return ResponseEntity.noContent().build();
    }
}