package rocket.jobrocketbackend.board.free.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeCreateCommentRequest {
    @NotBlank(message = "내용은 필수값 입니다.")
    private String content;
}
