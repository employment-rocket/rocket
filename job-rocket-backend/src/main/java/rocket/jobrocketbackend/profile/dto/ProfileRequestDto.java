package rocket.jobrocketbackend.profile.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.profile.entity.SectionType;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequestDto {
	private SectionType type;
	private Map<String, Object> data;
	private int order;
	private boolean isPublic;


}
