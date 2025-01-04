package rocket.jobrocketbackend.introduce.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class IntroduceResDto {
    private Long introduceId;
    private String name;
    private byte[] fileData;
    private LocalDateTime createdAt;
}
