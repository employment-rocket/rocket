package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticsService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public List<ScheduleGroupDTO> getStatisticsByStateAndType(Long userId){
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("사용자 정보가 없습니다."));
        List<ScheduleGroupDTO> list = scheduleRepository.findByUserAndGroupByState(user);
        list.addAll(scheduleRepository.findByUserAndGroupByType(user));
        return list;
    }

}
