package rocket.jobrocketbackend.profile.profile.service;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

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
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

@Service
public class ProfileService {

	private final ProfileRepository profileRepository;
	private final UserRepository userRepository;
	private final ProfileFileService profileFileService;

	public ProfileService(ProfileRepository profileRepository, UserRepository userRepository,
		ProfileFileService profileFileService) {
		this.profileRepository = profileRepository;
		this.userRepository = userRepository;
		this.profileFileService = profileFileService;
	}

	public ProfileResponseDto getProfile(Long memberId) {
		userRepository.findById(memberId)
			.orElseThrow(() -> new UserNotFoundException("회원 ID: " + memberId + "의 사용자를 찾을 수 없습니다."));

		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("회원 ID: " + memberId + "의 프로필을 찾을 수 없습니다."));

		List<Section> sortedSections = sortSectionsByOrder(profile.getSections());
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
		String fileName = profileFileService.uploadFile(file, sectionType);
		profileFileService.saveFileToProfile(memberId, fileName, sectionType, profileRepository);
		return sectionType == SectionType.PROFILE_IMAGE ? "프로필 이미지 업로드 성공" : "파일 업로드 성공";
	}

	public ResponseEntity<byte[]> getFileResponse(String fileName, SectionType sectionType) throws IOException {
		return profileFileService.getFileResponse(fileName, sectionType);
	}

	private List<Section> updateSections(ProfileEntity profileEntity, ProfileRequestDto request) {
		return profileEntity.getSections().stream()
			.filter(section -> !section.getType().equals(request.getType()))
			.collect(Collectors.collectingAndThen(Collectors.toList(), list -> {
				list.add(Section.builder()
					.type(request.getType())
					.data(request.getData())
					.order(request.getOrder())
					.build());
				return list;
			}));
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
		return Optional.ofNullable(sections)
			.orElse(Collections.emptyList())
			.stream()
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
