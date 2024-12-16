package rocket.jobrocketbackend.question.cs.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.service.CsService;

@RestController
@RequestMapping("/questions/cs")
@RequiredArgsConstructor
public class CsController {
    private final CsService csService;

    @GetMapping("/{page}")
    public ResponseEntity<Page<CsResDto>> csList(@PathVariable int page, @RequestParam Long memberId) {
        Page<CsResDto> csList = csService.findCsList(page, memberId);
        return ResponseEntity.ok(csList);
    }
}