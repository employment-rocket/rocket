package rocket.jobrocketbackend.board.free.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/board/free")
public class FreeBoardController {

    @GetMapping
    public ResponseEntity<List<FreeBoardResponse>> getFreeBoardList(){
        return ResponseEntity.ok(FreeBoardResponse.mockDataList());
    }
}
