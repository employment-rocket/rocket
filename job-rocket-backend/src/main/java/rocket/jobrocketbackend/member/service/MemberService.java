package rocket.jobrocketbackend.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.repository.MemberRepository;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Map<String, Object> getUserProfileById(Long memberId) {
        MemberEntity member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Map.of(
                "id", member.getId(),
                "nickname", member.getNickname()
        );
    }
    public Map<String, Object> getUserProfile(Long memberId){
        MemberEntity member = memberRepository.findById(memberId)
                .orElseThrow(()-> new RuntimeException("User not found"));

        return Map.of(
                "id",member.getId(),
                "email", member.getEmail(),
                "nickname", member.getNickname(),
                "allowEmail", member.getAllowEmail(),
                "allowAlarm", member.getAllowAlarm()
        );
    }

}
