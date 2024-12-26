package rocket.jobrocketbackend.question.personal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.question.personal.dto.response.PersonalResDto;
import rocket.jobrocketbackend.question.personal.service.PersonalService;

import java.util.List;

@RestController
@RequestMapping("/questions/personal")
@RequiredArgsConstructor
public class PersonalController {
    private final PersonalService personalService;

    @GetMapping("/{page}")
    public ResponseEntity<Page<PersonalResDto>> personalList(
            @PathVariable int page,
            @RequestParam Long memberId) {
        Page<PersonalResDto> personalList = personalService.findPersonalList(page, memberId);
        return ResponseEntity.ok(personalList);
    }
}