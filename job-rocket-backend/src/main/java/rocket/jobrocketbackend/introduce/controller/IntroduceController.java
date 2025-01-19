package rocket.jobrocketbackend.introduce.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.introduce.dto.response.IntroduceResDto;
import rocket.jobrocketbackend.introduce.service.IntroduceService;

import java.util.List;

@RestController
@RequestMapping("/introduces")
@RequiredArgsConstructor
public class IntroduceController {
    private final IntroduceService introduceService;

    @GetMapping
    public ResponseEntity<List<IntroduceResDto>> getIntroduceList(Authentication authentication) {
        List<IntroduceResDto> response = introduceService.getIntroduceListByAuthentication(authentication);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload")
    public ResponseEntity<IntroduceResDto> uploadIntroduce(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            Authentication authentication) {
        IntroduceResDto response = introduceService.saveIntroduce(file, authentication, name);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{introduceId}")
    public ResponseEntity<Void> deleteIntroduce(@PathVariable Long introduceId) {
        introduceService.deleteIntroduceById(introduceId);
        return ResponseEntity.noContent().build();
    }
}