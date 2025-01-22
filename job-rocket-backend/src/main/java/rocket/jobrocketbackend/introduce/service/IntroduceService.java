package rocket.jobrocketbackend.introduce.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.introduce.dto.response.IntroduceResDto;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;
import rocket.jobrocketbackend.introduce.repository.IntroduceJpaRepository;
import rocket.jobrocketbackend.introduce.exception.IntroduceNotFoundException;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class IntroduceService {

    private final IntroduceJpaRepository introduceJpaRepository;
    private final UserRepository userRepository;
    private final GptService gptService;

    public IntroduceService(IntroduceJpaRepository introduceJpaRepository,
                            UserRepository userRepository,
                            GptService gptService) {
        this.introduceJpaRepository = introduceJpaRepository;
        this.userRepository = userRepository;
        this.gptService = gptService;
    }

    public List<IntroduceResDto> getIntroduceList(Long memberId) {
        return introduceJpaRepository.findByMemberId(memberId).stream()
                .map(this::convertToDto)
                .toList();
    }

    public IntroduceResDto saveIntroduce(MultipartFile file, Long memberId, String name) {
        UserEntity user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));

        byte[] fileData = gptService.readFileData(file);

        IntroduceEntity introduce = IntroduceEntity.builder()
                .member(user)
                .name(name)
                .fileData(fileData)
                .questions(new ArrayList<>())
                .build();

        String fileContent = gptService.extractTextFromPdf(fileData);
        List<IntroduceQAEntity> gptGeneratedQuestions = gptService.createQuestionsWithGPT(introduce, fileContent);
        introduce.getQuestions().addAll(gptGeneratedQuestions);

        IntroduceEntity savedIntroduce = introduceJpaRepository.save(introduce);

        return convertToDto(savedIntroduce);
    }

    public void deleteIntroduceById(Long introduceId) {
        IntroduceEntity introduce = introduceJpaRepository.findById(introduceId)
                .orElseThrow(() -> new IntroduceNotFoundException("존재하지 않는 자소서입니다."));
        introduceJpaRepository.delete(introduce);
    }

    private IntroduceResDto convertToDto(IntroduceEntity entity) {
        return IntroduceResDto.builder()
                .introduceId(entity.getIntroduceId())
                .name(entity.getName())
                .fileData(entity.getFileData())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
