package rocket.jobrocketbackend.profile.profile.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.profile.profile.entity.Section;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponseDto {
	private Long memberId;
	private List<Section> sections;
	private boolean isPublic;

}
