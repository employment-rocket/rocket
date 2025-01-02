package rocket.jobrocketbackend.common.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Category {
    CS("CS"),
    PERSONAL("PERSONAL"),
    COMPANY_QA("COMPANY_QA"),
    INTRODUCE_QA("INTRODUCE_QA"),
    REVIEW_QA("REVIEW_QA");

    private final String name;
}

