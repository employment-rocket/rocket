package rocket.jobrocketbackend.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
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

    public Map<String, Object> getUserProfile(Long userId){
        UserEntity member = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        return Map.of(
                "id",member.getId(),
                "email", member.getEmail(),
                "nickname", member.getNickname(),
                "allowEmail", member.getAllowEmail(),
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

        String fileUrl = fileName;
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User with ID" +userId + "not found"));

        user.updateProfileImage(fileUrl);
        userRepository.save(user);
    }


    public byte[] getImageBytes(Long userId) throws FileNotFoundException {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User ID"+ userId +"not found"));

        Path filePath = Paths.get(UPLOAD_DIR, user.getProfile());

        if (!Files.exists(filePath)) {
            throw new FileNotFoundException("File not found: " + filePath.toString());
        }

        try {
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Unable to read the file.", e);
        }
    }

    public void updateAllowEmail(Long userId, Boolean allowEmail) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));

        user.updateAllowEmail(allowEmail);
        userRepository.save(user);
    }


}
