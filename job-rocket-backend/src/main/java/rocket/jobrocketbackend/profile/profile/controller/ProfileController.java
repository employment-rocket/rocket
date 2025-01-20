package rocket.jobrocketbackend.profile.profile.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import rocket.jobrocketbackend.profile.profile.dto.ProfileRequestDto;
import rocket.jobrocketbackend.profile.profile.dto.ProfileResponseDto;
import rocket.jobrocketbackend.profile.profile.entity.Section;
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


}
