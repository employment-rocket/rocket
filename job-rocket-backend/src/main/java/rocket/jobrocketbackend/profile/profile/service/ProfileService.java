package rocket.jobrocketbackend.profile.profile.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import rocket.jobrocketbackend.profile.profile.dto.ProfileRequestDto;
import rocket.jobrocketbackend.profile.profile.dto.ProfileResponseDto;
import rocket.jobrocketbackend.profile.profile.entity.ProfileEntity;
import rocket.jobrocketbackend.profile.profile.entity.Section;
import rocket.jobrocketbackend.profile.profile.entity.SectionType;
import rocket.jobrocketbackend.profile.profile.exception.ProfileNotFoundException;
import rocket.jobrocketbackend.profile.profile.exception.ProfileNotPublicException;
import rocket.jobrocketbackend.profile.profile.repository.ProfileRepository;
import rocket.jobrocketbackend.user.exception.FileNotFoundException;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

@Service
public class ProfileService {
	private final ProfileRepository profileRepository;
	private final UserRepository userRepository;

	private static final String IMAGE_UPLOAD_DIR = "uploads/profile-images/";
	private static final String FILE_UPLOAD_DIR = "uploads/profile-files/";

	public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
		this.profileRepository = profileRepository;
		this.userRepository = userRepository;
	}

	public ProfileResponseDto getProfile(Long memberId) {
		userRepository.findById(memberId)
			.orElseThrow(() -> new UserNotFoundException("회원 ID: " + memberId + "의 사용자를 찾을 수 없습니다."));

		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("회원 ID: " + memberId + "의 프로필을 찾을 수 없습니다."));

		List<Section> sortedSections = Optional.ofNullable(profile.getSections())
			.orElse(Collections.emptyList())
			.stream()
			.sorted(Comparator.comparingInt(Section::getOrder))
			.collect(Collectors.toCollection(ArrayList::new)); // 수정 가능한 리스트 생성
		return mapToResponse(profile, sortedSections);
	}

	public ProfileResponseDto addSection(Long memberId, ProfileRequestDto request) {
		ProfileEntity profileEntity = profileRepository.findByMemberId(memberId)
			.orElse(ProfileEntity.createWithMemberId(memberId));

		List<Section> updatedSections = updateSections(profileEntity, request);
		ProfileEntity updatedProfile = createUpdatedProfile(profileEntity, updatedSections);

		profileRepository.save(updatedProfile);
		return mapToResponse(updatedProfile, updatedSections);
	}

	public ProfileResponseDto updateSection(Long memberId, ProfileRequestDto request) {
		userRepository.findById(memberId)
			.orElseThrow(() -> new UserNotFoundException("회원 ID: " + memberId + "의 사용자를 찾을 수 없습니다."));

		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("회원 ID: " + memberId + "의 프로필을 찾을 수 없습니다."));

		List<Section> updatedSections = updateSections(profile, request);
		ProfileEntity updatedProfile = createUpdatedProfile(profile, updatedSections);

		profileRepository.save(updatedProfile);
		return mapToResponse(updatedProfile, updatedSections);
	}

	private List<Section> updateSections(ProfileEntity profileEntity, ProfileRequestDto request) {
		return profileEntity.getSections().stream()
			.filter(section -> !section.getType().equals(request.getType()))
			.collect(Collectors.collectingAndThen(
				Collectors.toCollection(ArrayList::new),
				list -> {
					list.add(Section.builder()
						.type(request.getType())
						.data(request.getData())
						.order(request.getOrder())
						.build());
					return list;
				}));
	}

	public ProfileResponseDto updateOrder(Long memberId, List<Section> reorderedSections) {
		if (reorderedSections == null || reorderedSections.isEmpty()) {
			throw new IllegalArgumentException("재정렬된 섹션 목록이 비어있거나 잘못되었습니다.");
		}

		userRepository.findById(memberId)
			.orElseThrow(() -> new UserNotFoundException("회원 ID: " + memberId + "의 사용자를 찾을 수 없습니다."));

		ProfileEntity profileEntity = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("회원 ID: " + memberId + "의 프로필을 찾을 수 없습니다."));

		Map<SectionType, Section> reorderedMap = reorderedSections.stream()
			.collect(Collectors.toMap(Section::getType, Function.identity()));

		List<Section> updatedSections = new ArrayList<>(profileEntity.getSections());

		for (int i = 0; i < updatedSections.size(); i++) {
			Section existingSection = updatedSections.get(i);
			if (reorderedMap.containsKey(existingSection.getType())) {
				Section newSection = reorderedMap.get(existingSection.getType());
				updatedSections.set(i, Section.builder()
					.type(existingSection.getType())
					.data(existingSection.getData())
					.order(newSection.getOrder())
					.build());
			}
		}

		ProfileEntity updatedProfile = createUpdatedProfile(profileEntity, updatedSections);

		profileRepository.save(updatedProfile);
		return mapToResponse(updatedProfile, updatedSections);
	}

	public void updatePublicStatus(Long memberId, boolean isPublic) {
		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("회원 ID: " + memberId + "의 프로필을 찾을 수 없습니다."));

		ProfileEntity updatedProfile = createUpdatedProfile(profile, profile.getSections(), isPublic);
		profileRepository.save(updatedProfile);
	}

	public List<ProfileResponseDto> getPublicProfiles() {
		return profileRepository.findAllByIsPublic(true).stream()
			.map(profile -> mapToResponse(profile, sortSectionsByOrder(profile.getSections())))
			.toList();
	}

	public ProfileResponseDto getPublicProfileById(Long memberId) {
		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("회원 ID: " + memberId + "의 프로필을 찾을 수 없습니다."));

		if (!profile.isPublic()) {
			throw new ProfileNotPublicException("이 프로필은 공개되지 않았습니다.");
		}

		return mapToResponse(profile, sortSectionsByOrder(profile.getSections()));
	}

	public String uploadFile(MultipartFile file, Long memberId, SectionType sectionType) throws IOException {
		validateSectionType(sectionType);

		String fileName = storeFile(file, sectionType);
		saveFileToProfile(memberId, fileName, sectionType);

		return sectionType == SectionType.PROFILE_IMAGE ? "프로필 이미지 업로드 성공" : "파일 업로드 성공";
	}

	public ResponseEntity<byte[]> getFileResponse(String fileName, SectionType sectionType) throws IOException {
		byte[] fileBytes = getFile(fileName, sectionType);
		MediaType mediaType = sectionType == SectionType.PROFILE_IMAGE ? MediaType.IMAGE_JPEG : MediaType.APPLICATION_OCTET_STREAM;

		return ResponseEntity.ok()
			.contentType(mediaType)
			.body(fileBytes);
	}

	private void saveFileToProfile(Long memberId, String fileName, SectionType sectionType) {
		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElse(ProfileEntity.createWithMemberId(memberId));

		List<Section> updatedSections = updateFileSections(profile.getSections(), fileName, sectionType);
		ProfileEntity updatedProfile = createUpdatedProfile(profile, updatedSections);

		profileRepository.save(updatedProfile);
	}

	private List<Section> updateFileSections(List<Section> sections, String fileName, SectionType sectionType) {
		List<Section> updatedSections = new ArrayList<>(sections); // 수정 가능한 리스트 생성

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

	private void validateSectionType(SectionType sectionType) {
		if (sectionType != SectionType.PROFILE_IMAGE && sectionType != SectionType.FILEUPLOAD) {
			throw new IllegalArgumentException("잘못된 파일 업로드 유형입니다.");
		}
	}

	private String storeFile(MultipartFile file, SectionType sectionType) throws IOException {
		String fileExtension = Objects.requireNonNull(file.getOriginalFilename())
			.substring(file.getOriginalFilename().lastIndexOf("."));
		String fileName = System.currentTimeMillis() + fileExtension;

		Path filePath = Paths.get(getUploadDirectory(sectionType), fileName);

		Files.createDirectories(filePath.getParent());
		Files.write(filePath, file.getBytes());

		return fileName;
	}

	private byte[] getFile(String fileName, SectionType sectionType) throws IOException {
		Path filePath = Paths.get(getUploadDirectory(sectionType), fileName);

		if (!Files.exists(filePath)) {
			throw new FileNotFoundException("파일을 찾을 수 없습니다: " + filePath);
		}

		return Files.readAllBytes(filePath);
	}

	private String getUploadDirectory(SectionType sectionType) {
		return sectionType == SectionType.PROFILE_IMAGE ? IMAGE_UPLOAD_DIR : FILE_UPLOAD_DIR;
	}

	private ProfileEntity createUpdatedProfile(ProfileEntity profile, List<Section> updatedSections) {
		return ProfileEntity.builder()
			.id(profile.getId())
			.memberId(profile.getMemberId())
			.sections(updatedSections)
			.isPublic(profile.isPublic())
			.build();
	}

	private ProfileEntity createUpdatedProfile(ProfileEntity profile, List<Section> updatedSections, boolean isPublic) {
		return ProfileEntity.builder()
			.id(profile.getId())
			.memberId(profile.getMemberId())
			.sections(updatedSections)
			.isPublic(isPublic)
			.build();
	}

	private List<Section> sortSectionsByOrder(List<Section> sections) {
		return sections.stream()
			.sorted(Comparator.comparingInt(Section::getOrder))
			.collect(Collectors.toList());
	}

	private ProfileResponseDto mapToResponse(ProfileEntity profile, List<Section> sortedSections) {
		return ProfileResponseDto.builder()
			.memberId(profile.getMemberId())
			.sections(sortedSections)
			.isPublic(profile.isPublic())
			.build();
	}
}
