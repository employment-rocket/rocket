package rocket.jobrocketbackend.question.review_qa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.question.review_qa.dto.response.ReviewQAResDto;
import rocket.jobrocketbackend.question.review_qa.service.ReviewQAService;

import java.util.List;

@RestController
@RequestMapping("/questions/review-qa")
@RequiredArgsConstructor
public class ReviewQAController {
    private final ReviewQAService reviewQAService;

    @GetMapping("/{scheduleId}")
    public ResponseEntity<List<ReviewQAResDto>> getReviewQAList(
            @PathVariable Long scheduleId,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        List<ReviewQAResDto> response = reviewQAService.getQuestionsByScheduleId(scheduleId, memberId);
        return ResponseEntity.ok(response);
    }
}