package rocket.jobrocketbackend.answer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.answer.dto.response.AnswerListResDto;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

@Slf4j
@RequestMapping("/answers")
@RestController
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @GetMapping
    public ResponseEntity<AnswerListResDto> getCheckedAnswerList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        AnswerListResDto response = answerService.findCheckedAnswerList(memberId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/unchecked")
    public ResponseEntity<AnswerListResDto> getUncheckedAnswerList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        AnswerListResDto response = answerService.findUncheckedAnswerList(memberId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Long> createAnswer(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                             @RequestParam Category category,
                                             @RequestParam Long qid,
                                             @RequestParam(required = false, defaultValue = "") String content,
                                             @RequestParam(required = false, defaultValue = "false") boolean isIn) {
        Long memberId = customOAuth2User.getId();
        Long answerId = answerService.addAnswer(memberId, category, qid, content, isIn);
        return ResponseEntity.ok(answerId);
    }

    @PatchMapping("/content")
    public ResponseEntity<String> updateAnswerContent(@RequestParam Long answerId,
                                                      @RequestParam(required = false) String content) {
        answerService.modifyAnswerContent(answerId, content);
        return ResponseEntity.ok("Answer updated successfully");
    }

    @PatchMapping("/check")
    public ResponseEntity<String> updateAnswerIsIn(@RequestParam Long answerId) {
        answerService.modifyAnswerIsIn(answerId);
        return ResponseEntity.ok("Answer updated successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAnswer(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                               @RequestParam Category category,
                                               @RequestParam Long qid) {
        Long memberId = customOAuth2User.getId();
        answerService.removeAnswer(memberId, category, qid);
        return ResponseEntity.ok("Answer deleted successfully");
    }
}
