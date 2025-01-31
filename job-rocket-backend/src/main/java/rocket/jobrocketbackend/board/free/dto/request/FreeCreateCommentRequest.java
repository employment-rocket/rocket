package rocket.jobrocketbackend.board.free.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class FreeCreateCommentRequest {
    @NotBlank(message = "내용은 필수값 입니다.")
    private String content;
}
