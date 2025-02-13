package rocket.jobrocketbackend.question.introduce_qa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.question.introduce_qa.dto.response.IntroduceQAResDto;
import rocket.jobrocketbackend.question.introduce_qa.service.IntroduceQAService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.List;

@RestController
@RequestMapping("/questions/introduce-qa")
@RequiredArgsConstructor
public class IntroduceQAController {
    private final IntroduceQAService introduceQAService;

    @GetMapping("/{introduceId}")
    public ResponseEntity<List<IntroduceQAResDto>> getIntroduceQAList(
            @PathVariable Long introduceId,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        List<IntroduceQAResDto> response = introduceQAService.getQuestionsByIntroduceId(introduceId, memberId);
        return ResponseEntity.ok(response);
    }
}