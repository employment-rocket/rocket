package rocket.jobrocketbackend.question.cs.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.service.CsService;

import java.util.List;

@RestController
@RequestMapping("/questions/cs")
@RequiredArgsConstructor
public class CsController {
    private final CsService csService;

    @GetMapping("/{page}")
    public ResponseEntity<Page<CsResDto>> csList(
            @PathVariable int page,
            @RequestParam Long memberId,
            @RequestParam List<String> subcategories // 배열 형식으로 처리
    ) {
        Page<CsResDto> csList = csService.findCsListBySubcategories(page, memberId, subcategories);
        return ResponseEntity.ok(csList);
    }
}