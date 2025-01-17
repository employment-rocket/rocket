package rocket.jobrocketbackend.question.cs.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    @GetMapping
    public ResponseEntity<List<CsResDto>> csList(
            @RequestParam List<String> subcategories,
            Authentication authentication
    ) {
        List<CsResDto> csList = csService.findCsListBySubcategories(subcategories, authentication);
        return ResponseEntity.ok(csList);
    }
}