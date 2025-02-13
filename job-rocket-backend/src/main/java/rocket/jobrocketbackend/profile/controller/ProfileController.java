package rocket.jobrocketbackend.profile.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import rocket.jobrocketbackend.common.dto.PageDto;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;
import rocket.jobrocketbackend.profile.dto.ProfileRequestDto;
import rocket.jobrocketbackend.profile.dto.ProfileResponseDto;
import rocket.jobrocketbackend.profile.entity.Section;
import rocket.jobrocketbackend.profile.entity.SectionType;
import rocket.jobrocketbackend.profile.service.ProfileService;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {

	private final ProfileService profileService;

	@GetMapping
	public ResponseEntity<ProfileResponseDto> getProfile(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Long memberId = customOAuth2User.getId();
		return ResponseEntity.ok(profileService.getProfile(memberId));
	}

	@PostMapping
	public ResponseEntity<ProfileResponseDto> addSection(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
		@RequestBody ProfileRequestDto request) {
		Long memberId = customOAuth2User.getId();
		return ResponseEntity.ok(profileService.addSection(memberId, request));
	}

	@PutMapping
	public ResponseEntity<ProfileResponseDto> updateSection(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
		@RequestBody ProfileRequestDto request) {
		Long memberId = customOAuth2User.getId();
		return ResponseEntity.ok(profileService.updateSection(memberId, request));
	}

	@PutMapping("/order")
	public ResponseEntity<ProfileResponseDto> updateOrder(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
		@RequestBody List<Section> reorderedSections) {
		Long memberId = customOAuth2User.getId();
		return ResponseEntity.ok(profileService.updateOrder(memberId, reorderedSections));
	}

	@PostMapping("/status")
	public ResponseEntity<Void> updatePublicStatus(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
		@RequestParam boolean isPublic) {
		Long memberId = customOAuth2User.getId();
		profileService.updatePublicStatus(memberId, isPublic);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/public")
	public ResponseEntity<List<ProfileResponseDto>> getPublicProfiles() {
		List<ProfileResponseDto> publicProfiles = profileService.getPublicProfiles();
		return ResponseEntity.ok(publicProfiles);
	}

	@GetMapping("/public/{memberId}")
	public ResponseEntity<ProfileResponseDto> getPublicProfileById(@PathVariable Long memberId) {
		ProfileResponseDto profile = profileService.getPublicProfileById(memberId);
		return ResponseEntity.ok(profile);
	}

	@PostMapping("/upload")
	public ResponseEntity<Map<String, String>> uploadFile(
		@RequestParam MultipartFile file,
		@RequestParam SectionType sectionType,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) throws IOException {
		Long memberId = customOAuth2User.getId();
		Map<String, String> response = profileService.uploadFileWithResponse(file, sectionType, memberId);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/file/{fileName}")
	public ResponseEntity<byte[]> getFile(
		@PathVariable String fileName,
		@RequestParam SectionType sectionType) throws IOException {
		return profileService.getFileResponse(fileName, sectionType);
	}

	@GetMapping("/public/paginated")
	public ResponseEntity<PageDto<ProfileResponseDto>> getPublicProfilesPaginated(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "20") int size) {

		PageDto<ProfileResponseDto> profiles = profileService.getPublicProfilesPaginated(page, size);
		return ResponseEntity.ok(profiles);
	}

}
