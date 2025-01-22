package rocket.jobrocketbackend.note.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.note.dto.response.NoteResDto;
import rocket.jobrocketbackend.note.service.NoteService;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<NoteResDto> sendMessage(@RequestBody NoteResDto request) {
        NoteResDto response = noteService.saveMessage(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/unread/{receiverId}")
    public ResponseEntity<List<NoteResDto>> getUnreadMessages(@PathVariable Long receiverId) {
        List<NoteResDto> unreadMessages = noteService.getUnreadMessages(receiverId);
        return ResponseEntity.ok(unreadMessages);
    }

    @GetMapping("/conversation/{userId}/{otherUserId}")
    public ResponseEntity<List<NoteResDto>> getConversation(
            @PathVariable Long userId,
            @PathVariable Long otherUserId) {
        List<NoteResDto> conversation = noteService.getConversation(userId, otherUserId);
        return ResponseEntity.ok(conversation);
    }

    @PostMapping("/read/{receiverId}")
    public ResponseEntity<Void> markMessagesAsRead(@PathVariable Long receiverId) {
        noteService.markMessagesAsRead(receiverId);
        return ResponseEntity.ok().build();
    }

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public NoteResDto sendMessageViaWebSocket(NoteResDto message) {
        return noteService.saveAndBroadcast(message);
    }
}