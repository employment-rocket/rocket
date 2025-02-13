package rocket.jobrocketbackend.note.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class NoteReqDto {
    String receiverName;
    String content;
}
