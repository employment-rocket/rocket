package rocket.jobrocketbackend.note.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import rocket.jobrocketbackend.note.dto.request.NoteReqDto;
import rocket.jobrocketbackend.note.dto.response.NoteResDto;
import rocket.jobrocketbackend.note.service.NoteService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

@Controller
@RequiredArgsConstructor
public class WebSocketNoteController {

    private final NoteService noteService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/ws/send")
    public void handleMessage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, NoteReqDto noteReqDto) {
        Long senderId = customOAuth2User.getId();
        Long noteId = noteService.sendMessage(senderId, noteReqDto.getReceiverName(), noteReqDto.getContent());

        NoteResDto broadcastMessage = noteService.getMessageById(noteId);

        messagingTemplate.convertAndSendToUser(
                noteReqDto.getReceiverName(),
                "/queue/messages",
                broadcastMessage
        );

        messagingTemplate.convertAndSend("/topic/messages", broadcastMessage);
    }
}