package rocket.jobrocketbackend.schedule.entity;

public enum ScheduleState {
    Ongoing("진행중"), Fail("탈락") , Passed("최종합격");

    private String text;
    ScheduleState(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
