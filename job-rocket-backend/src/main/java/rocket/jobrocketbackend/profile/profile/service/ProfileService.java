package rocket.jobrocketbackend.profile.profile.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import rocket.jobrocketbackend.profile.profile.dto.ProfileRequestDto;
import rocket.jobrocketbackend.profile.profile.dto.ProfileResponseDto;
import rocket.jobrocketbackend.profile.profile.entity.ProfileEntity;
import rocket.jobrocketbackend.profile.profile.entity.Section;
import rocket.jobrocketbackend.profile.profile.entity.SectionType;
import rocket.jobrocketbackend.profile.profile.exception.ProfileNotFoundException;
import rocket.jobrocketbackend.profile.profile.repository.ProfileRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

@Service
public class ProfileService

{
	private final ProfileRepository profileRepository;
	private final UserRepository userRepository;

	public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
		this.profileRepository = profileRepository;
		this.userRepository = userRepository;

	}

	public ProfileResponseDto getProfile(Long memberId) {

		UserEntity user = userRepository.findById(memberId)
			.orElseThrow(() -> new UserNotFoundException("User not found for memberId: " + memberId));

		ProfileEntity profile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("Profile not found for memberId: " + memberId));

		List<Section> sortedSections = profile.getSections().stream()
			.sorted((s1, s2) -> Integer.compare(s1.getOrder(), s2.getOrder()))
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
		UserEntity member = userRepository.findById(memberId)
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

	public ProfileResponseDto updatePublicStatus(Long memberId, boolean isPublic) {

		ProfileEntity updatedProfile = profileRepository.findByMemberId(memberId)
			.orElseThrow(() -> new ProfileNotFoundException("Profile not found for memberId: " + memberId))
			.withUpdatedPublicStatus(isPublic);

		profileRepository.save(updatedProfile);

		return mapToResponse(updatedProfile);
	}

	private ProfileResponseDto mapToResponse(ProfileEntity profile) {
		List<Section> sortedSections = profile.getSections().stream()
			.sorted((s1, s2) -> Integer.compare(s1.getOrder(), s2.getOrder()))
			.toList();

		return ProfileResponseDto.builder()
			.memberId(profile.getMemberId())
			.sections(sortedSections)
			.isPublic(profile.isPublic())
			.build();
	}
}



