package rocket.jobrocketbackend.profile.profile.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import rocket.jobrocketbackend.profile.profile.dto.ProfileRequestDto;
import rocket.jobrocketbackend.profile.profile.dto.ProfileResponseDto;
import rocket.jobrocketbackend.profile.profile.entity.Section;
import rocket.jobrocketbackend.profile.profile.entity.SectionType;
import rocket.jobrocketbackend.profile.profile.service.ProfileService;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {

	private final ProfileService profileService;

	@GetMapping("/{memberId}")
	public ResponseEntity<ProfileResponseDto> getProfile(@PathVariable Long memberId) {
		return ResponseEntity.ok(profileService.getProfile(memberId));
	}

	@PostMapping("/{memberId}")
	public ResponseEntity<ProfileResponseDto> addSection(@PathVariable Long memberId, @RequestBody ProfileRequestDto request) {
		return ResponseEntity.ok(profileService.addSection(memberId, request));
	}

	@PutMapping("/{memberId}")
	public ResponseEntity<ProfileResponseDto> updateSection(@PathVariable Long memberId, @RequestBody ProfileRequestDto request) {
		return ResponseEntity.ok(profileService.updateSection(memberId, request));
	}

	@PutMapping("/{memberId}/order")
	public ResponseEntity<ProfileResponseDto> updateOrder(
		@PathVariable Long memberId,
		@RequestBody List<Section> reorderedSections) {

		ProfileResponseDto response = profileService.updateOrder(memberId, reorderedSections);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/{memberId}/status")
	public ResponseEntity<Void> updatePublicStatus(@PathVariable Long memberId, @RequestParam boolean isPublic) {
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


	@PostMapping("/{memberId}/upload")
	public ResponseEntity<String> uploadFile(@PathVariable Long memberId,
		@RequestParam MultipartFile file,
		@RequestParam SectionType sectionType) throws IOException {

		if (sectionType != SectionType.PROFILE_IMAGE && sectionType != SectionType.FILEUPLOAD) {
			return ResponseEntity.badRequest().body("Invalid section type for file upload.");
		}

		profileService.saveFile(file, memberId, sectionType);
		return ResponseEntity.ok(sectionType == SectionType.PROFILE_IMAGE ? "프로필 이미지 업로드 성공" : "파일 업로드 성공");
	}

	@GetMapping("/file/{fileName}")
	public ResponseEntity<byte[]> getFile(
		@PathVariable String fileName,
		@RequestParam SectionType sectionType) throws IOException {
		byte[] fileBytes = profileService.getFile(fileName, sectionType);
		MediaType mediaType = sectionType == SectionType.PROFILE_IMAGE ? MediaType.IMAGE_JPEG : MediaType.APPLICATION_OCTET_STREAM;

		return ResponseEntity.ok()
			.contentType(mediaType)
			.body(fileBytes);
	}





}
