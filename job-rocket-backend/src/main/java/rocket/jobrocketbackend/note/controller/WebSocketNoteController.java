package rocket.jobrocketbackend.note.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import rocket.jobrocketbackend.note.dto.response.NoteResDto;
import rocket.jobrocketbackend.note.service.NoteService;

@Controller
@RequiredArgsConstructor
public class WebSocketNoteController {

    private final NoteService noteService;

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public NoteResDto handleMessage(NoteResDto message) {
        return noteService.saveAndBroadcast(message);
    }
}