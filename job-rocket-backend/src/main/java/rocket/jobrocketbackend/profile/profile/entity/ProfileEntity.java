package rocket.jobrocketbackend.profile.profile.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class ProfileEntity {
	@Id
	private String id;
	private Long memberId;
	private List<Section> sections;

	private boolean isPublic;


	public static ProfileEntity createWithMemberId(Long memberId) {
		return ProfileEntity.builder()
			.memberId(memberId)
			.sections(new ArrayList<>())
			.build();
	}

	// Immutable 방식으로 sections 업데이트
	public ProfileEntity withUpdatedSections(List<Section> updatedSections) {
		return ProfileEntity.builder()
			.id(this.id)
			.memberId(this.memberId)
			.sections(updatedSections)
			.isPublic(this.isPublic)
			.build();
	}

}
