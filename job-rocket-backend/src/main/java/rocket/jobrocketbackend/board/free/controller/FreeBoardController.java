package rocket.jobrocketbackend.board.free.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.board.free.service.FreeBoardService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/board/free")
@RequiredArgsConstructor
public class FreeBoardController {

    private final FreeBoardService freeBoardService;

    @GetMapping
    public ResponseEntity<List<FreeBoardResponse>> getFreeBoardList(){
        return ResponseEntity.ok(FreeBoardResponse.mockDataList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FreeBoardResponse> getFreeBoard(@PathVariable("id")Long id){
        List<FreeBoardResponse> list = FreeBoardResponse.mockDataList().stream().filter(item -> item.getId().equals(id)).toList();
        return ResponseEntity.ok(list.get(0));
    }

    @PostMapping
    public ResponseEntity<Void> createFreeBoard(@RequestBody FreeBoardCreateRequest request, @AuthenticationPrincipal CustomOAuth2User user){
        log.info("userEmail = {}",user.getEmail());
        log.info("request = {}", request);
        freeBoardService.create(request, user.getEmail());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
