package rocket.jobrocketbackend.introduce.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.introduce.dto.response.IntroduceResDto;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;
import rocket.jobrocketbackend.introduce.exception.FileProcessingException;
import rocket.jobrocketbackend.introduce.exception.IntroduceNotFoundException;
import rocket.jobrocketbackend.introduce.repository.IntroduceJpaRepository;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IntroduceService {
    private final IntroduceJpaRepository introduceJpaRepository;
    private final UserRepository userRepository;

    public List<IntroduceResDto> getIntroduceListByMemberId(Long memberId) {
        List<IntroduceEntity> introduces = introduceJpaRepository.findByMemberId(memberId);
        return introduces.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private IntroduceResDto convertToDto(IntroduceEntity entity) {
        return IntroduceResDto.builder()
                .introduceId(entity.getIntroduceId())
                .name(entity.getName())
                .fileData(entity.getFileData())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public IntroduceResDto saveIntroduce(MultipartFile file, Long memberId, String name) {
        UserEntity user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));

        byte[] fileData;
        try {
            fileData = file.getBytes();
        } catch (IOException e) {
            throw new FileProcessingException("파일 데이터를 읽는 중 오류가 발생했습니다.", e);
        }

        IntroduceEntity introduce = IntroduceEntity.builder()
                .member(user)
                .name(name)
                .fileData(fileData)
                .build();

        if (introduce.getQuestions() == null) {
            introduce.setQuestions(new ArrayList<>());
        }

        List<IntroduceQAEntity> dummyQuestions = createDummyQuestions(introduce);
        introduce.getQuestions().addAll(dummyQuestions);

        IntroduceEntity savedIntroduce = introduceJpaRepository.save(introduce);

        return IntroduceResDto.builder()
                .introduceId(savedIntroduce.getIntroduceId())
                .name(savedIntroduce.getName())
                .fileData(savedIntroduce.getFileData())
                .build();
    }


    private List<IntroduceQAEntity> createDummyQuestions(IntroduceEntity introduce) {
        List<IntroduceQAEntity> questions = new ArrayList<>();

        questions.add(IntroduceQAEntity.builder()
                .question("이 회사에 지원한 이유는 무엇인가요?")
                .introduce(introduce)
                .build());

        questions.add(IntroduceQAEntity.builder()
                .question("본인의 가장 큰 강점은 무엇인가요?")
                .introduce(introduce)
                .build());

        questions.add(IntroduceQAEntity.builder()
                .question("5년 후 본인의 모습은 어떤 모습인가요?")
                .introduce(introduce)
                .build());

        return questions;
    }

    public void deleteIntroduceById(Long introduceId) {
        IntroduceEntity introduce = introduceJpaRepository.findById(introduceId)
                .orElseThrow(() -> new IntroduceNotFoundException("존재하지 않는 자소서입니다."));
        introduceJpaRepository.delete(introduce);
    }

}
