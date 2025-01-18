package rocket.jobrocketbackend.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.repository.MemberRepository;
import rocket.jobrocketbackend.member.request.MemberEditReq;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private static final String UPLOAD_DIR = "uploads/";

    public Map<String, Object> getUserProfileById(Long memberId) {
        MemberEntity member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Map.of(
                "id", member.getId(),
                "nickname", member.getNickname()
        );
    }
    public Map<String, Object> getUserProfile(Long memberId){
        MemberEntity member = memberRepository.findById(memberId)
                .orElseThrow(()-> new RuntimeException("User not found"));

        return Map.of(
                "id",member.getId(),
                "email", member.getEmail(),
                "nickname", member.getNickname(),
                "allowEmail", member.getAllowEmail(),
                "allowAlarm", member.getAllowAlarm(),
                "profile", member.getProfile()
        );
    }


    public void updateUserProfile(Long userId, MemberEditReq memberEditReq) {

        MemberEntity member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        member.editInfo(memberEditReq);
        memberRepository.save(member);
    }


  public String saveFile(MultipartFile file) throws IOException {
      String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
      Path filePath = Paths.get(UPLOAD_DIR + fileName);
      Files.createDirectories(filePath.getParent());
      Files.write(filePath, file.getBytes());

      // 반환되는 경로를 URL 형식으로 변환
      String fileUrl = "/uploads/" + fileName;
      return fileUrl;
  }
}
