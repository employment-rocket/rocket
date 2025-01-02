package rocket.jobrocketbackend.question.personal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.common.dto.PageDto;
import rocket.jobrocketbackend.question.personal.dto.response.PersonalResDto;
import rocket.jobrocketbackend.question.personal.service.PersonalService;

@RestController
@RequestMapping("/questions/personal")
@RequiredArgsConstructor
public class PersonalController {
    private final PersonalService personalService;

    @GetMapping("/{page}")
    public ResponseEntity<PageDto<PersonalResDto>> personalList(
            @PathVariable int page,
            @RequestParam Long memberId) {
        Page<PersonalResDto> personalList = personalService.findPersonalList(page, memberId);
        PageDto<PersonalResDto> pageDto = PageDto.of(personalList);
        return ResponseEntity.ok(pageDto);
    }
}
