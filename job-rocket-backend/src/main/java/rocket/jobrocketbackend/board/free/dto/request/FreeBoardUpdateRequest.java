package rocket.jobrocketbackend.board.free.dto.request;

import lombok.*;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EqualsAndHashCode
public class FreeBoardUpdateRequest {
    private Long id;
    private String title;
    private String content;
}
