package rocket.jobrocketbackend.note.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ConversationResDto {
    private Long conversationId;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private String otherUserName;
    private String otherUserProfile;
    private int unreadMessageCount;
}