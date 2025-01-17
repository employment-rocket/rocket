package rocket.jobrocketbackend.question.introduce_qa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.question.introduce_qa.dto.response.IntroduceQAResDto;
import rocket.jobrocketbackend.question.introduce_qa.service.IntroduceQAService;

import java.util.List;

@RestController
@RequestMapping("/questions/introduce-qa")
@RequiredArgsConstructor
public class IntroduceQAController {
    private final IntroduceQAService introduceQAService;

    @GetMapping("/{introduceId}")
    public ResponseEntity<List<IntroduceQAResDto>> getIntroduceQAList(
            @PathVariable Long introduceId,
            Authentication authentication) {
        List<IntroduceQAResDto> response = introduceQAService.getQuestionsByIntroduceId(introduceId, authentication);
        return ResponseEntity.ok(response);
    }
}