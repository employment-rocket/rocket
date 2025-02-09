package rocket.jobrocketbackend.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

	@Field("isPublic")
	private boolean isPublic;


	public static ProfileEntity createWithMemberId(Long memberId) {
		return ProfileEntity.builder()
			.memberId(memberId)
			.sections(new ArrayList<>())
			.build();
	}

	public ProfileEntity withUpdatedSections(List<Section> updatedSections) {
		return ProfileEntity.builder()
			.id(this.id)
			.memberId(this.memberId)
			.sections(updatedSections)
			.isPublic(this.isPublic)
			.build();
	}

	public ProfileEntity withUpdatedPublicStatus(boolean isPublic) {
		return ProfileEntity.builder()
			.id(this.id)
			.memberId(this.memberId)
			.sections(this.sections)
			.isPublic(isPublic)
			.build();
	}

	public ProfileEntity addFileSection(SectionType sectionType, String fileName) {
		List<Section> updatedSections = new ArrayList<>(this.sections);

		updatedSections.add(Section.builder()
			.type(sectionType)
			.data(Map.of("fileName", fileName))
			.order(updatedSections.size() + 1)
			.build());

		return withUpdatedSections(updatedSections);
	}



}
