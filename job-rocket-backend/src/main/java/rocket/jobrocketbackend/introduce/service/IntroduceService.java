package rocket.jobrocketbackend.introduce.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;
import rocket.jobrocketbackend.introduce.dto.request.GPTRequest;
import rocket.jobrocketbackend.introduce.dto.response.GPTResponse;
import rocket.jobrocketbackend.introduce.dto.response.IntroduceResDto;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;
import rocket.jobrocketbackend.introduce.exception.FileProcessingException;
import rocket.jobrocketbackend.introduce.exception.GPTProcessingException;
import rocket.jobrocketbackend.introduce.exception.IntroduceNotFoundException;
import rocket.jobrocketbackend.introduce.repository.IntroduceJpaRepository;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;
import rocket.jobrocketbackend.question.introduce_qa.repository.IntroduceQAJpaRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class IntroduceService {

    private final IntroduceJpaRepository introduceJpaRepository;
    private final UserRepository userRepository;
    private final IntroduceQAJpaRepository introduceQAJpaRepository;
    private final RestTemplate gptRestTemplate;

    @Value("${gpt.api.url}")
    private String gptApiUrl;

    @Value("${gpt.model}")
    private String gptModel;

    public IntroduceService(IntroduceJpaRepository introduceJpaRepository,
                            UserRepository userRepository, IntroduceQAJpaRepository introduceQAJpaRepository,
                            @Qualifier("gptRestTemplate") RestTemplate gptRestTemplate) {
        this.introduceJpaRepository = introduceJpaRepository;
        this.userRepository = userRepository;
        this.introduceQAJpaRepository = introduceQAJpaRepository;
        this.gptRestTemplate = gptRestTemplate;
    }

    public List<IntroduceResDto> getIntroduceListByAuthentication(Authentication authentication) {
        Long memberId = extractMemberIdFromAuthentication(authentication);
        return introduceJpaRepository.findByMemberId(memberId).stream()
                .map(this::convertToDto)
                .toList();
    }

    private IntroduceResDto convertToDto(IntroduceEntity entity) {
        return IntroduceResDto.builder()
                .introduceId(entity.getIntroduceId())
                .name(entity.getName())
                .fileData(entity.getFileData())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public IntroduceResDto saveIntroduce(MultipartFile file, Authentication authentication, String name) {
        Long memberId = extractMemberIdFromAuthentication(authentication);
        UserEntity user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("존재하지 않는 사용자입니다."));

        byte[] fileData = readFileData(file);

        IntroduceEntity introduce = IntroduceEntity.builder()
                .member(user)
                .name(name)
                .fileData(fileData)
                .questions(new ArrayList<>())
                .build();

        String fileContent = extractTextFromPdf(fileData);
        List<IntroduceQAEntity> gptGeneratedQuestions = createQuestionsWithGPT(introduce, fileContent);
        introduce.getQuestions().addAll(gptGeneratedQuestions);

        IntroduceEntity savedIntroduce = introduceJpaRepository.save(introduce);

        return convertToDto(savedIntroduce);
    }

    private byte[] readFileData(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new FileProcessingException("파일 데이터를 읽는 중 오류가 발생했습니다.", e);
        }
    }

    public List<IntroduceQAEntity> createQuestionsWithGPT(IntroduceEntity introduce, String fileContent) {
        String prompt = generatePrompt(fileContent);
        GPTRequest gptRequest = new GPTRequest(gptModel, prompt, 1, 3000, 1, 0, 0);
        GPTResponse gptResponse = gptRestTemplate.postForObject(gptApiUrl, gptRequest, GPTResponse.class);

        if (gptResponse == null || gptResponse.getChoices() == null || gptResponse.getChoices().isEmpty()) {
            throw new GPTProcessingException("GPT 응답을 처리하는 중 오류가 발생했습니다.");
        }

        String rawContent = gptResponse.getChoices().get(0).getMessage().getContent();
        String cleanContent = rawContent.trim().replaceAll("^```json", "").replaceAll("```$", "");
        return parseQuestions(cleanContent, introduce);
    }


    private List<IntroduceQAEntity> parseQuestions(String cleanContent, IntroduceEntity introduce) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree(cleanContent);
            JsonNode questionsNode = rootNode.get("questions");

            if (questionsNode == null || !questionsNode.isArray()) {
                throw new GPTProcessingException("GPT 응답 JSON 파싱 중 오류가 발생했습니다. 'questions' 배열이 없습니다.");
            }

            List<IntroduceQAEntity> questions = new ArrayList<>();
            questionsNode.forEach(questionNode -> questions.add(
                    IntroduceQAEntity.builder()
                            .question(questionNode.asText())
                            .introduce(introduce)
                            .build()
            ));
            return questions;
        } catch (IOException e) {
            throw new GPTProcessingException("GPT 응답 JSON 파싱 중 오류가 발생했습니다.", e);
        }
    }

    private String generatePrompt(String fileContent) {
        StringBuilder promptBuilder = new StringBuilder();
        loadFileContentAsLines().forEach(line -> promptBuilder.append(line).append("\n"));
        promptBuilder.append("\nContent: ").append(fileContent);
        return promptBuilder.toString();
    }

    private List<String> loadFileContentAsLines() {
        try {
            return Files.readAllLines(Paths.get("src/main/resources/commands.txt"));
        } catch (IOException e) {
            throw new FileProcessingException("파일 읽기 오류: src/main/resources/commands.txt", e);
        }
    }

    private String extractTextFromPdf(byte[] fileData) {
        try (PDDocument document = Loader.loadPDF(new RandomAccessReadBuffer(fileData))) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document).trim();
        } catch (IOException e) {
            throw new FileProcessingException("PDF에서 텍스트를 추출하는 중 오류 발생", e);
        }
    }

    public void deleteIntroduceById(Long introduceId) {
        IntroduceEntity introduce = introduceJpaRepository.findById(introduceId)
                .orElseThrow(() -> new IntroduceNotFoundException("존재하지 않는 자소서입니다."));
        introduceQAJpaRepository.deleteByIntroduceId(introduceId);
        introduceJpaRepository.delete(introduce);
    }

    private Long extractMemberIdFromAuthentication(Authentication authentication) {
        if (authentication == null) {
            throw new IllegalStateException("Authentication is missing");
        }
        String username = authentication.getName();
        UserEntity user = userRepository.findByNickname(username)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다: " + username));
        return user.getId();
    }
}