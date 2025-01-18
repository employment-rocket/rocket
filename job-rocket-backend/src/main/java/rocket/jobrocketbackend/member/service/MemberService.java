package rocket.jobrocketbackend.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.repository.MemberRepository;
import rocket.jobrocketbackend.member.request.MemberEditReq;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
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


    public void saveFile(MultipartFile file, Long userId) throws IOException {

        String fileExtension = Objects.requireNonNull(file.getOriginalFilename())
                .substring(file.getOriginalFilename().lastIndexOf("."));


        String fileName = userId + fileExtension;
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        String fileUrl = "/uploads/" + fileName;
    }

    public  byte[] getImageBytes(Long memberId) throws IOException {

        Path filePath = Paths.get(UPLOAD_DIR, memberId + ".jpg");

        if (!Files.exists(filePath)) {
            throw new FileNotFoundException("File not found: " + filePath.toString());
        }
        log.info("filePath: {}",filePath.toUri());

        return Files.readAllBytes(filePath);
    }
}
