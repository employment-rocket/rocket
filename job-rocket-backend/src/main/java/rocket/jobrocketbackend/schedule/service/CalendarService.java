package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.exception.MemberNotFoundException;
import rocket.jobrocketbackend.member.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final ScheduleRepository scheduleRepository;
    private final MemberRepository userRepository;

    public List<ScheduleDTO> getScheduleList(Long memberId) {
        MemberEntity user = userRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException("해당 유저가 없습니다."));
        return scheduleRepository.findByUserAndIsNotFail(user).stream().map(ScheduleDTO::from).toList();
    }
}
