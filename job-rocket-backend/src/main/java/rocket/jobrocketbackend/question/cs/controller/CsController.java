package rocket.jobrocketbackend.question.cs.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.question.cs.dto.response.CsResDto;
import rocket.jobrocketbackend.question.cs.service.CsService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.List;

@RestController
@RequestMapping("/questions/cs")
@RequiredArgsConstructor
public class CsController {
    private final CsService csService;

    @GetMapping
    public ResponseEntity<List<CsResDto>> getCsList(
            @RequestParam List<String> subcategories,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
    ) {
        Long memberId = customOAuth2User.getId();
        List<CsResDto> csList = csService.findCsListBySubcategories(subcategories, memberId);
        return ResponseEntity.ok(csList);
    }
}