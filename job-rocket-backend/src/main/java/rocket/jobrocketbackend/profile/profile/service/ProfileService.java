package rocket.jobrocketbackend.profile.profile.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import rocket.jobrocketbackend.profile.profile.dto.ProfileResponseDto;
import rocket.jobrocketbackend.profile.profile.entity.ProfileEntity;
import rocket.jobrocketbackend.profile.profile.entity.Section;
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
}



