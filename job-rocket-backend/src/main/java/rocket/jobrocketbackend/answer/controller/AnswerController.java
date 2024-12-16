package rocket.jobrocketbackend.answer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.answer.dto.response.AnswerListResDto;
import rocket.jobrocketbackend.answer.service.AnswerService;

@RequestMapping("/answers")
@RestController
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @GetMapping("/")
    public AnswerListResDto checkedAnswerList(@RequestParam Long memberId) {
        return answerService.findCheckedAnswerList(memberId);
    }

    @PostMapping("/add")
    public ResponseEntity<String> answerAdd(@RequestParam Long memberId,
                                            @RequestParam String category,
                                            @RequestParam Long qid,
                                            @RequestParam(required = false, defaultValue = "") String content,
                                            @RequestParam(required = false, defaultValue = "false") boolean isIn) {
        answerService.addAnswer(memberId, category, qid, content, isIn);
        return ResponseEntity.ok("Answer added successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<String> answerModify(@RequestParam Long memberId,
                                               @RequestParam String category,
                                               @RequestParam Long qid,
                                               @RequestParam(required = false) String content,
                                               @RequestParam(required = false) Boolean isIn) {
        answerService.modifyAnswer(memberId, category, qid, content, isIn);
        return ResponseEntity.ok("Answer updated successfully");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> answerRemove(@RequestParam Long memberId,
                                               @RequestParam String category,
                                               @RequestParam Long qid) {
        answerService.removeAnswer(memberId, category, qid);
        return ResponseEntity.ok("Answer deleted successfully");
    }
}
