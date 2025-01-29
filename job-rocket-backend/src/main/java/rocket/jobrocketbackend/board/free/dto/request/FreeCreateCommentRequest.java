package rocket.jobrocketbackend.board.free.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeCreateCommentRequest {
    private String content;
}
