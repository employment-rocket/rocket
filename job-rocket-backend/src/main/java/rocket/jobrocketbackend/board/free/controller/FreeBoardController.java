package rocket.jobrocketbackend.board.free.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.board.free.dto.request.FreeBoardCreateRequest;
import rocket.jobrocketbackend.board.free.dto.response.FreeBoardResponse;
import rocket.jobrocketbackend.board.free.service.FreeBoardService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.time.LocalDate;
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
    public ResponseEntity<FreeBoardResponse> createFreeBoard(@RequestBody FreeBoardCreateRequest request, @AuthenticationPrincipal CustomOAuth2User user){
        log.info("userEmail = {}",user.getEmail());
        log.info("request = {}", request);
        FreeBoardResponse result = freeBoardService.create(request, user.getEmail(), LocalDate.now());
        return new ResponseEntity<>(result,HttpStatus.CREATED);
    }

    @GetMapping("/temp/{imageName}")
    public ResponseEntity<Resource> getProfileImage(@PathVariable("imageName")String imageName) throws MalformedURLException {
        // TODO 임시 메소드 추후에 마이페이지, 프로파일, 게시글에 필요한 이미지가져오기 통합 메서드 만들기
        Path path = Path.of("uploads/" + imageName);
        Resource resource = new UrlResource("file:" + path);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(resource,headers,HttpStatus.OK);
    }
}
