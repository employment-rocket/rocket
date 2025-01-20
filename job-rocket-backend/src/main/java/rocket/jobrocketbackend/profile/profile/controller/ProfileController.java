package rocket.jobrocketbackend.profile.profile.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import rocket.jobrocketbackend.profile.profile.dto.ProfileResponseDto;
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

}
