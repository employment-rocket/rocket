package rocket.jobrocketbackend.board.free.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.board.free.dto.request.FreeCreateCommentRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeCommentResponse;
import rocket.jobrocketbackend.board.free.service.FreeCommentService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.List;

@RestController
@RequestMapping("/board/free/{boardId}/comment")
@RequiredArgsConstructor
public class FreeCommentController {

    private final FreeCommentService freeCommentService;

    @PostMapping
    public ResponseEntity<Void> createComment(@PathVariable("boardId")Long boardId
            , @RequestBody FreeCreateCommentRequest request
            , @AuthenticationPrincipal CustomOAuth2User user){
        freeCommentService.create(request,boardId,user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<FreeCommentResponse>> getCommentList(@PathVariable("boardId")Long boradId){
        List<FreeCommentResponse> result = freeCommentService.tempFindBoard(boradId);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId")Long commentId, @AuthenticationPrincipal CustomOAuth2User user){
        freeCommentService.delete(commentId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
