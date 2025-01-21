package rocket.jobrocketbackend.profile.profile.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

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
public class ProfileService

{
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
			.orElseThrow(() -> new UserNotFoundException("User not found for memberId: " + memberId));

		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("Profile not found for memberId: " + memberId));

		List<Section> sortedSections = profile.getSections().stream()
			.sorted(Comparator.comparingInt(Section::getOrder))
			.toList();

		return ProfileResponseDto.builder()
			.memberId(profile.getMemberId())
			.sections(sortedSections)
			.isPublic(profile.isPublic())
			.build();
	}

	public ProfileResponseDto addSection(Long memberId, ProfileRequestDto request) {
		ProfileEntity profileEntity = profileRepository.findByMemberId(memberId)
			.orElse(ProfileEntity.createWithMemberId(memberId));

		List<Section> updatedSections = updateSections(profileEntity, request.getType(), request);
		ProfileEntity updatedProfile = profileEntity.withUpdatedSections(updatedSections);
		profileRepository.save(updatedProfile);

		return mapToResponse(updatedProfile);
	}

	public ProfileResponseDto updateSection(Long memberId, ProfileRequestDto request) {
		userRepository.findById(memberId)
			.orElseThrow(() -> new UserNotFoundException("User not found for memberId: " + memberId));

		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("Profile not found for memberId: " + memberId));

		List<Section> updatedSections = updateSections(profile, request.getType(), request);
		ProfileEntity updatedProfile = profile.withUpdatedSections(updatedSections);
		profileRepository.save(updatedProfile);

		return mapToResponse(updatedProfile);
	}

	private List<Section> updateSections(ProfileEntity profileEntity, SectionType sectionType, ProfileRequestDto request) {
		List<Section> updatedSections = new ArrayList<>(profileEntity.getSections());
		updatedSections.removeIf(section -> section.getType().equals(sectionType));
		updatedSections.add(Section.builder()
			.type(sectionType)
			.data(request.getData())
			.order(request.getOrder())
			.build());
		return updatedSections;
	}

	public ProfileResponseDto updateOrder(Long memberId, List<Section> reorderedSections) {
		if (reorderedSections == null || reorderedSections.isEmpty()) {
			throw new IllegalArgumentException("Reordered sections list cannot be null or empty");
		}

		userRepository.findById(memberId)
			.orElseThrow(() -> new UserNotFoundException("User not found for memberId: " + memberId));

		ProfileEntity profileEntity = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("Profile not found for memberId: " + memberId));

		Map<SectionType, Section> reorderedMap = reorderedSections.stream()
			.collect(Collectors.toMap(Section::getType, Function.identity()));

		List<Section> updatedSections = profileEntity.getSections().stream()
			.map(existingSection -> reorderedMap.containsKey(existingSection.getType())
				? existingSection.withUpdatedOrder(reorderedMap.get(existingSection.getType()).getOrder())
				: existingSection)
			.collect(Collectors.toList());

		reorderedSections.stream()
			.filter(reorderedSection -> updatedSections.stream()
				.noneMatch(existingSection -> existingSection.getType().equals(reorderedSection.getType())))
			.forEach(updatedSections::add);

		ProfileEntity updatedProfile = profileEntity.withUpdatedSections(updatedSections);
		profileRepository.save(updatedProfile);

		return mapToResponse(updatedProfile);
	}

	public void updatePublicStatus(Long memberId, boolean isPublic) {

		ProfileEntity updatedProfile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("Profile not found for memberId: " + memberId))
			.withUpdatedPublicStatus(isPublic);

		profileRepository.save(updatedProfile);
	}

	public List<ProfileResponseDto> getPublicProfiles() {
		List<ProfileEntity> publicProfiles = profileRepository.findAllByIsPublic(true);

		return publicProfiles.stream()
			.map(this::mapToResponse)
			.toList();
	}

	public ProfileResponseDto getPublicProfileById(Long memberId) {
		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("Profile not found for ID: " + memberId));

		if (!profile.isPublic()) {
			throw new ProfileNotPublicException("This profile is not public.");
		}

		return mapToResponse(profile);
	}


	public void saveFile(MultipartFile file, Long memberId, SectionType sectionType) throws IOException {
		String fileName = storeFile(file, sectionType);

		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElse(ProfileEntity.createWithMemberId(memberId));

		if (sectionType == SectionType.PROFILE_IMAGE) {
			Section basicInfoSection = profile.getSections().stream()
				.filter(section -> section.getType() == SectionType.BASICINFO)
				.findFirst()
				.orElseGet(() -> Section.builder().type(SectionType.BASICINFO).data(new HashMap<>()).build());

			basicInfoSection.getData().put("profileImage", fileName);
			List<Section> updatedSections = new ArrayList<>(profile.getSections());
			updatedSections.removeIf(section -> section.getType() == SectionType.BASICINFO);
			updatedSections.add(basicInfoSection);

			profile = profile.withUpdatedSections(updatedSections);
		} else if (sectionType == SectionType.FILEUPLOAD) {
			Section portfolioSection = profile.getSections().stream()
				.filter(section -> section.getType() == SectionType.PORTFOLIO)
				.findFirst()
				.orElseGet(() -> Section.builder().type(SectionType.PORTFOLIO).data(new HashMap<>()).build());

			@SuppressWarnings("unchecked")
			List<String> files = (List<String>) portfolioSection.getData().computeIfAbsent("files", k -> new ArrayList<>());
			files.add(fileName);

			List<Section> updatedSections = new ArrayList<>(profile.getSections());
			updatedSections.removeIf(section -> section.getType() == SectionType.PORTFOLIO);
			updatedSections.add(portfolioSection);

			profile = profile.withUpdatedSections(updatedSections);
		}

		profileRepository.save(profile);
	}

	private String storeFile(MultipartFile file, SectionType sectionType) throws IOException {
		String fileExtension = Objects.requireNonNull(file.getOriginalFilename())
			.substring(file.getOriginalFilename().lastIndexOf("."));
		String fileName = System.currentTimeMillis() + fileExtension;

		String uploadDir = getUploadDirectory(sectionType);
		Path filePath = Paths.get(uploadDir, fileName);

		Files.createDirectories(filePath.getParent());
		Files.write(filePath, file.getBytes());

		return fileName;
	}

	public byte[] getFile(String fileName, SectionType sectionType) throws IOException {
		String uploadDir = getUploadDirectory(sectionType);
		Path filePath = Paths.get(uploadDir, fileName);

		if (!Files.exists(filePath)) {
			throw new FileNotFoundException("File not found at: " + filePath);
		}

		return Files.readAllBytes(filePath);
	}

	private String getUploadDirectory(SectionType sectionType) {
		return sectionType == SectionType.PROFILE_IMAGE ? IMAGE_UPLOAD_DIR : FILE_UPLOAD_DIR;
	}



	private ProfileResponseDto mapToResponse(ProfileEntity profile) {
		List<Section> sortedSections = profile.getSections().stream()
			.sorted(Comparator.comparingInt(Section::getOrder))
			.toList();

		return ProfileResponseDto.builder()
			.memberId(profile.getMemberId())
			.sections(sortedSections)
			.isPublic(profile.isPublic())
			.build();
	}
}



