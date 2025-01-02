package rocket.jobrocketbackend.question.cs.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.common.dto.PageDto;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.service.CsService;

import java.util.List;

@RestController
@RequestMapping("/questions/cs")
@RequiredArgsConstructor
public class CsController {
    private final CsService csService;

    @GetMapping("/{page}")
    public ResponseEntity<PageDto<CsResDto>> csList(
            @PathVariable int page,
            @RequestParam Long memberId,
            @RequestParam List<String> subcategories
    ) {
        Page<CsResDto> csList = csService.findCsListBySubcategories(page, memberId, subcategories);
        PageDto<CsResDto> pageDto = PageDto.of(csList);
        return ResponseEntity.ok(pageDto);
    }

}