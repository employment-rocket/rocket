package rocket.jobrocketbackend.profile.profile.service;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import rocket.jobrocketbackend.profile.profile.entity.ProfileEntity;
import rocket.jobrocketbackend.profile.profile.entity.Section;
import rocket.jobrocketbackend.profile.profile.entity.SectionType;
import rocket.jobrocketbackend.profile.profile.repository.ProfileRepository;
import rocket.jobrocketbackend.user.exception.FileNotFoundException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ProfileFileService {

	private static final String IMAGE_UPLOAD_DIR = "uploads/profile-images/";
	private static final String FILE_UPLOAD_DIR = "uploads/profile-files/";

	public String uploadFile(MultipartFile file, SectionType sectionType) throws IOException {
		validateSectionType(sectionType);

		String fileExtension = Objects.requireNonNull(file.getOriginalFilename())
			.substring(file.getOriginalFilename().lastIndexOf("."));
		String fileName = System.currentTimeMillis() + fileExtension;

		Path filePath = Paths.get(getUploadDirectory(sectionType), fileName);
		Files.createDirectories(filePath.getParent());
		Files.write(filePath, file.getBytes());

		return fileName;
	}

	public ResponseEntity<byte[]> getFileResponse(String fileName, SectionType sectionType) throws IOException {
		byte[] fileBytes = getFile(fileName, sectionType);
		MediaType mediaType = sectionType == SectionType.PROFILE_IMAGE ? MediaType.IMAGE_JPEG : MediaType.APPLICATION_OCTET_STREAM;

		return ResponseEntity.ok()
			.contentType(mediaType)
			.body(fileBytes);
	}

	public void saveFileToProfile(Long memberId, String fileName, SectionType sectionType, ProfileRepository profileRepository) {
		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElse(ProfileEntity.createWithMemberId(memberId));

		List<Section> updatedSections = updateFileSections(profile.getSections(), fileName, sectionType);
		ProfileEntity updatedProfile = ProfileEntity.builder()
			.id(profile.getId())
			.memberId(profile.getMemberId())
			.sections(updatedSections)
			.isPublic(profile.isPublic())
			.build();

		profileRepository.save(updatedProfile);
	}

	private byte[] getFile(String fileName, SectionType sectionType) throws IOException {
		Path filePath = Paths.get(getUploadDirectory(sectionType), fileName);

		if (!Files.exists(filePath)) {
			throw new FileNotFoundException("파일을 찾을 수 없습니다: " + filePath);
		}

		return Files.readAllBytes(filePath);
	}

	private List<Section> updateFileSections(List<Section> sections, String fileName, SectionType sectionType) {
		List<Section> updatedSections = new ArrayList<>(sections);

		if (sectionType == SectionType.PROFILE_IMAGE) {
			updatedSections.removeIf(section -> section.getType() == SectionType.BASICINFO);
			updatedSections.add(Section.builder()
				.type(SectionType.BASICINFO)
				.data(Map.of("profileImage", fileName))
				.build());
		} else if (sectionType == SectionType.FILEUPLOAD) {
			Section portfolioSection = updatedSections.stream()
				.filter(section -> section.getType() == SectionType.PORTFOLIO)
				.findFirst()
				.orElseGet(() -> Section.builder().type(SectionType.PORTFOLIO).data(new HashMap<>()).build());

			@SuppressWarnings("unchecked")
			List<String> files = (List<String>) portfolioSection.getData().computeIfAbsent("files", k -> new ArrayList<>());
			files.add(fileName);

			updatedSections.removeIf(section -> section.getType() == SectionType.PORTFOLIO);
			updatedSections.add(portfolioSection);
		}

		return updatedSections;
	}

	private String getUploadDirectory(SectionType sectionType) {
		return sectionType == SectionType.PROFILE_IMAGE ? IMAGE_UPLOAD_DIR : FILE_UPLOAD_DIR;
	}

	private void validateSectionType(SectionType sectionType) {
		if (sectionType != SectionType.PROFILE_IMAGE && sectionType != SectionType.FILEUPLOAD) {
			throw new IllegalArgumentException("잘못된 파일 업로드 유형입니다.");
		}
	}
}
