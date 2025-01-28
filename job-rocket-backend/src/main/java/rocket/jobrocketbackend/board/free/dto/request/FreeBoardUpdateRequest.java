package rocket.jobrocketbackend.board.free.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class FreeBoardUpdateRequest {
    private Long id;
    private String title;
    private String content;
}
