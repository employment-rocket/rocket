package rocket.jobrocketbackend.profile.profile.entity;

public enum SectionType {
	BASICINFO("기본정보"),
	EXPERIENCE("경력"),
	INTERESTFIELD("관심분야"),
	RELATEDJOBS("관련직업"),
	TAGSSELECTION("태그"),
	EDUCATION("교육"),
	PORTFOLIO("포트폴리오"),
	PROJECT("프로젝트"),
	ACTIVITY("대외활동"),
	SKILLS("기술스택"),
	CERTIFICATION("자격증"),
	LANGUAGES("외국어"),
	SELFINTRO("자기소개"),
	PROFILE_IMAGE("프로필 이미지"),
	FILEUPLOAD("파일");

	private String text;

	SectionType(String text) {
		this.text = text;
	}

	public String getText() {
		return text;
	}

	public static SectionType from(String value) {
		for (SectionType type : SectionType.values()) {
			if (type.name().equalsIgnoreCase(value)) {
				return type;
			}
		}
		throw new IllegalArgumentException("잘못된 섹션 타입 값입니다.");
	}
}
