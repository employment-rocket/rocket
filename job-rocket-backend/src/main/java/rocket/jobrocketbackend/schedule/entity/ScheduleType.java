package rocket.jobrocketbackend.schedule.entity;

public enum ScheduleType {
    Document("서류전형"), First("1차면접"),Second("2차면접"),Final("최종");

    private String text;

    ScheduleType(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
