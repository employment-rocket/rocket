package rocket.jobrocketbackend.question.personal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.question.personal.dto.response.PersonalResDto;
import rocket.jobrocketbackend.question.personal.service.PersonalService;

import java.util.List;

@RestController
@RequestMapping("/questions/personal")
@RequiredArgsConstructor
public class PersonalController {
    private final PersonalService personalService;

    @GetMapping
    public ResponseEntity<List<PersonalResDto>> getPersonalList(Authentication authentication) {
        List<PersonalResDto> personalList = personalService.findAllPersonal(authentication);
        return ResponseEntity.ok(personalList);
    }
}