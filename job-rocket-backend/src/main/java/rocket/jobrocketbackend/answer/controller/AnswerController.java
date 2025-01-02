package rocket.jobrocketbackend.answer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.answer.dto.response.AnswerListResDto;
import rocket.jobrocketbackend.answer.service.AnswerService;
import rocket.jobrocketbackend.common.entity.Category;

@Slf4j
@RequestMapping("/answers")
@RestController
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @GetMapping
    public ResponseEntity<AnswerListResDto> getCheckedAnswerList(@RequestParam Long memberId) {
        AnswerListResDto response = answerService.findCheckedAnswerList(memberId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/unchecked")
    public ResponseEntity<AnswerListResDto> getUncheckedAnswerList(@RequestParam Long memberId) {
        AnswerListResDto response = answerService.findUncheckedAnswerList(memberId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Long> createAnswer(@RequestParam Long memberId,
                                             @RequestParam Category category,
                                             @RequestParam Long qid,
                                             @RequestParam(required = false, defaultValue = "") String content,
                                             @RequestParam(required = false, defaultValue = "false") boolean isIn) {
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
    public ResponseEntity<String> deleteAnswer(@RequestParam Long memberId,
                                               @RequestParam Category category,
                                               @RequestParam Long qid) {
        answerService.removeAnswer(memberId, category, qid);
        return ResponseEntity.ok("Answer deleted successfully");
    }
}