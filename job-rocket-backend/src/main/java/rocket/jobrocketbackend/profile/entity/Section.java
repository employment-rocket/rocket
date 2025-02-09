package rocket.jobrocketbackend.profile.entity;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {
	private SectionType  type;
	private Map<String, Object> data;
	private int order;

	public Section withUpdatedOrder(int newOrder) {
		return Section.builder()
			.type(this.type)
			.data(this.data)
			.order(newOrder)
			.build();
	}
}