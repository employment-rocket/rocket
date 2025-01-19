package rocket.jobrocketbackend.introduce.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import rocket.jobrocketbackend.introduce.dto.request.GPTRequest;
import rocket.jobrocketbackend.introduce.dto.response.GPTResponse;
import rocket.jobrocketbackend.introduce.entity.IntroduceEntity;
import rocket.jobrocketbackend.introduce.exception.FileProcessingException;
import rocket.jobrocketbackend.introduce.exception.GPTProcessingException;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GptService {

    @Value("${gpt.api.url}")
    private String gptApiUrl;

    @Value("${gpt.model}")
    private String gptModel;

    @Value("${gpt.api.key}")
    private String apiKey;

    private RestTemplate createRestTemplateWithAuth() {
        RestTemplate restTemplate = new RestTemplate();
        ClientHttpRequestInterceptor interceptor = (request, body, execution) -> {
            request.getHeaders().add("Authorization", "Bearer " + apiKey);
            return execution.execute(request, body);
        };
        restTemplate.getInterceptors().add(interceptor);
        return restTemplate;
    }

    public List<IntroduceQAEntity> createQuestionsWithGPT(IntroduceEntity introduce, String fileContent) {
        String prompt = generatePrompt(fileContent);
        GPTRequest gptRequest = new GPTRequest(gptModel, prompt, 1, 3000, 1, 0, 0);
        RestTemplate restTemplate = createRestTemplateWithAuth();
        GPTResponse gptResponse = restTemplate.postForObject(gptApiUrl, gptRequest, GPTResponse.class);

        if (gptResponse == null || gptResponse.getChoices() == null || gptResponse.getChoices().isEmpty()) {
            throw new GPTProcessingException("GPT 응답을 처리하는 중 오류가 발생했습니다.");
        }

        String rawContent = gptResponse.getChoices().get(0).getMessage().getContent();
        String cleanContent = rawContent.trim().replaceAll("^```json", "").replaceAll("```$", "");
        return parseQuestions(cleanContent, introduce);
    }

    public byte[] readFileData(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new FileProcessingException("파일 데이터를 읽는 중 오류가 발생했습니다.", e);
        }
    }

    public String extractTextFromPdf(byte[] fileData) {
        try (PDDocument document = Loader.loadPDF(new RandomAccessReadBuffer(fileData))) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document).trim();
        } catch (IOException e) {
            throw new FileProcessingException("PDF에서 텍스트를 추출하는 중 오류 발생", e);
        }
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
}