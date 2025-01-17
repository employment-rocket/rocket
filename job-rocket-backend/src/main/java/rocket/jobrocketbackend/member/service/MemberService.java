package rocket.jobrocketbackend.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.member.entity.MemberEntity;
import rocket.jobrocketbackend.member.repository.MemberRepository;
import rocket.jobrocketbackend.member.request.MemberEditReq;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
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
                "allowAlarm", member.getAllowAlarm(),
                "profile", member.getProfile()
        );
    }


    public void updateUserProfile(Long userId, MemberEditReq memberEditReq) {

        MemberEntity member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        member.editInfo(memberEditReq);
        memberRepository.save(member);
    }

}
