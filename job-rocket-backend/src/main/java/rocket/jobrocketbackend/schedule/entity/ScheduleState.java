package rocket.jobrocketbackend.schedule.entity;

import rocket.jobrocketbackend.schedule.exception.IllegalScheduleStateException;

public enum ScheduleState {
    Ongoing("진행중"), Fail("탈락") , Passed("최종합격");

    private String text;
    ScheduleState(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public static ScheduleState from(String value){
        for(ScheduleState state : ScheduleState.values()) {
            if (state.name().equals(value)) {
                return state;
            }
        }
        throw new IllegalScheduleStateException("잘못된 상태 값입니다.");
    }
}
