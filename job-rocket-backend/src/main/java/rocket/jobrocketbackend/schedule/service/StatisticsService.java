package rocket.jobrocketbackend.schedule.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.schedule.dto.ScheduleGroupDTO;
import rocket.jobrocketbackend.schedule.repository.ScheduleRepository;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.exception.MemberNotFoundException;
import rocket.jobrocketbackend.member.repository.MemberRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticsService {

    private final ScheduleRepository scheduleRepository;
    private final MemberRepository userRepository;

    public Map<String, Long> getStatisticsByStateAndType(Long userId){
        MemberEntity user = userRepository.findById(userId).orElseThrow(() -> new MemberNotFoundException("사용자 정보가 없습니다."));
        List<ScheduleGroupDTO> list = scheduleRepository.findByUserAndGroupByState(user);
        list.addAll(scheduleRepository.findByUserAndGroupByType(user));
        return list.stream().collect(Collectors.toMap(ScheduleGroupDTO::getKey, ScheduleGroupDTO::getCount));
    }

    public Long getDocumentFailCount(Long userId){
        //TODO 나중에 개선하기
        MemberEntity user = userRepository.findById(userId).orElseThrow(() -> new MemberNotFoundException("사용자 정보가 없습니다."));
        return scheduleRepository.findByUserAndTypeDocumentAndStateFailCount(user);
    }
}
