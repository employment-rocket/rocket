package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.schedule.dto.ScheduleDTO;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public List<ScheduleDTO> getScheduleList(Long memberId) {
        UserEntity user = userRepository.findById(memberId).orElseThrow(() -> new UserNotFoundException("해당 유저가 없습니다."));
        return scheduleRepository.findByUserAndIsNotFail(user).stream().map(ScheduleDTO::from).toList();
    }
}
