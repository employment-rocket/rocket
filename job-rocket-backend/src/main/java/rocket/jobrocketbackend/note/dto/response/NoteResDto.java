package rocket.jobrocketbackend.note.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class NoteResDto {
    private Long id;
    private String content;
    private String senderName;
    private String receiverName;
    private LocalDateTime createdAt;
    private boolean isRead;
}
