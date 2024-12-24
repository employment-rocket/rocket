package rocket.jobrocketbackend.schedule.entity;

import rocket.jobrocketbackend.schedule.exception.IllegalScheduleTypeException;

public enum ScheduleType {
    Document("서류전형"), First("1차면접"), Second("2차면접"), Final("최종");

    private String text;

    ScheduleType(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public static ScheduleType from(String value) {
        for (ScheduleType type : ScheduleType.values()) {
            if (type.name().equals(value)) {
                return type;
            }
        }
        throw new IllegalScheduleTypeException("잘못된 타입 값입니다.");
    }
}
