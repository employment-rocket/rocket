package rocket.jobrocketbackend.profile.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import rocket.jobrocketbackend.profile.entity.SectionType;

@Service
public class ProfileFileService {

	private static final String BASE_DIR = System.getProperty("user.dir") + "/uploads/";
	private static final String IMAGE_UPLOAD_DIR = BASE_DIR + "profile-images/";
	private static final String FILE_UPLOAD_DIR = BASE_DIR + "profile-files/";

	public String uploadFile(MultipartFile file, SectionType sectionType) throws IOException {
		if (file == null || file.isEmpty()) {
			throw new IllegalArgumentException("파일이 비어 있습니다.");
		}

		String originalFileName = file.getOriginalFilename();
		if (originalFileName == null || originalFileName.trim().isEmpty()) {
			throw new IllegalArgumentException("파일 이름이 유효하지 않습니다.");
		}

		String savedFileName = System.currentTimeMillis() + "_" + originalFileName;
		Path filePath = Paths.get(getUploadDirectory(sectionType), savedFileName);

		Files.createDirectories(filePath.getParent());
		Files.write(filePath, file.getBytes());

		return savedFileName;
	}

	public byte[] getFile(String fileName, SectionType sectionType) throws IOException {
		Path filePath = Paths.get(getUploadDirectory(sectionType), fileName);

		if (!Files.exists(filePath)) {
			throw new IllegalArgumentException("파일을 찾을 수 없습니다: " + fileName);
		}

		return Files.readAllBytes(filePath);
	}

	public MediaType determineMediaType(String fileName) {
		int dotIndex = fileName.lastIndexOf(".");
		if (dotIndex == -1) {
			return MediaType.APPLICATION_OCTET_STREAM;
		}

		String extension = fileName.substring(dotIndex + 1).toLowerCase();
		return switch (extension) {
			case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
			case "png" -> MediaType.IMAGE_PNG;
			case "pdf" -> MediaType.APPLICATION_PDF;
			default -> MediaType.APPLICATION_OCTET_STREAM;
		};
	}

	public Map<String, Object> getFileAndMediaType(String fileName, SectionType sectionType) throws IOException {
		byte[] fileBytes = getFile(fileName, sectionType);
		MediaType mediaType = determineMediaType(fileName);
		return Map.of(
			"fileBytes", fileBytes,
			"mediaType", mediaType
		);
	}

	private String getUploadDirectory(SectionType sectionType) {
		return sectionType == SectionType.PROFILE_IMAGE ? IMAGE_UPLOAD_DIR : FILE_UPLOAD_DIR;
	}
}
