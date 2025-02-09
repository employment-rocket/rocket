package rocket.jobrocketbackend.question.review_qa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.question.review_qa.dto.request.ReviewQAReqDto;
import rocket.jobrocketbackend.question.review_qa.dto.request.ReviewQAUpdateReqDto;
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

    @PostMapping
    public ResponseEntity<ReviewQAResDto> createReviewQA(
            @RequestBody ReviewQAReqDto reviewQAReqDto,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        ReviewQAResDto response = reviewQAService.createReviewQA(reviewQAReqDto, memberId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/schedule/{scheduleId}")
    public ResponseEntity<Void> deleteReviewBySchedule(
            @PathVariable Long scheduleId,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        reviewQAService.deleteReviewByScheduleId(scheduleId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{qid}")
    public ResponseEntity<Void> deleteReviewQA(
            @PathVariable Long qid,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        reviewQAService.deleteReviewQAById(qid);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{qid}")
    public ResponseEntity<ReviewQAResDto> updateReviewQA(
            @PathVariable Long qid,
            @RequestBody ReviewQAUpdateReqDto requestDto,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getId();
        ReviewQAResDto updatedReviewQA = reviewQAService.updateReviewQA(qid, requestDto.getQuestion(), memberId);
        return ResponseEntity.ok(updatedReviewQA);
    }
}