package rocket.jobrocketbackend.board.free.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.board.free.service.FreeCommentService;

@RestController
@RequestMapping("/board/free")
@RequiredArgsConstructor
public class FreeCommentController {

    private final FreeCommentService freeCommentService;

    @PostMapping("/${boardId}/comment")
    public ResponseEntity<Void> createComment(@PathVariable("boardId")Long boardId, @RequestBody FreeCommentController request){

        return ResponseEntity.noContent().build();
    }
}
