package rocket.jobrocketbackend.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


}
