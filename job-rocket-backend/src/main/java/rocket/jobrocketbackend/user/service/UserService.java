package rocket.jobrocketbackend.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.repository.UserRepository;
import rocket.jobrocketbackend.user.request.UserEditReq;

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
public class UserService {

    private final UserRepository userRepository;
    private static final String UPLOAD_DIR = "uploads/";

    public Map<String, Object> getUserProfileById(Long memberId) {
        UserEntity member = userRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Map.of(
                "id", member.getId(),
                "nickname", member.getNickname()
        );
    }
    public Map<String, Object> getUserProfile(Long memberId){
        UserEntity member = userRepository.findById(memberId)
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

    public void updateAllowEmail(Long userId, Boolean allowEmail) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));
        user.updateAllowEmail(allowEmail);
        userRepository.save(user);
    }

    public void updateAllowAlarm(Long userId, Boolean allowAlarm) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));
        user.updateAllowAlarm(allowAlarm);
        userRepository.save(user);
    }
}
