package rocket.jobrocketbackend.profile.profile.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Objects;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import rocket.jobrocketbackend.profile.profile.entity.SectionType;

@Service
public class ProfileFileService {

	private static final String IMAGE_UPLOAD_DIR = "uploads/profile-images/";
	private static final String FILE_UPLOAD_DIR = "uploads/profile-files/";

	public String uploadFile(MultipartFile file, SectionType sectionType) throws IOException {
		String fileExtension = Objects.requireNonNull(file.getOriginalFilename())
			.substring(file.getOriginalFilename().lastIndexOf("."));
		String fileName = System.currentTimeMillis() + fileExtension;

		Path filePath = Paths.get(getUploadDirectory(sectionType), fileName);
		Files.createDirectories(filePath.getParent());
		Files.write(filePath, file.getBytes());

		return fileName;
	}

	public byte[] getFile(String fileName, SectionType sectionType) throws IOException {
		Path filePath = Paths.get(getUploadDirectory(sectionType), fileName);
		if (!Files.exists(filePath)) {
			throw new IllegalArgumentException("파일을 찾을 수 없습니다: " + fileName);
		}
		return Files.readAllBytes(filePath);
	}

	public MediaType determineMediaType(String fileName) {
		String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

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
