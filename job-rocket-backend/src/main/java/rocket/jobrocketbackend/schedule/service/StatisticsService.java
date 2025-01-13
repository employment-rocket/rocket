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
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticsService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public Map<String, Long> getStatisticsByStateAndType(Long userId){
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("사용자 정보가 없습니다."));
        List<ScheduleGroupDTO> list = scheduleRepository.findByUserAndGroupByState(user);
        list.addAll(scheduleRepository.findByUserAndGroupByType(user));
        return list.stream().collect(Collectors.toMap(ScheduleGroupDTO::getKey, ScheduleGroupDTO::getCount));
    }

    public Long getDocumentFailCount(Long userId){
        //TODO 나중에 개선하기
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("사용자 정보가 없습니다."));
        return scheduleRepository.findByUserAndTypeDocumentAndStateFailCount(user);
    }
}
