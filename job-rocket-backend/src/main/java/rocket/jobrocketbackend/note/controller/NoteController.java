package rocket.jobrocketbackend.note.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rocket.jobrocketbackend.note.dto.response.ConversationResDto;
import rocket.jobrocketbackend.note.dto.response.NoteResDto;
import rocket.jobrocketbackend.note.service.NoteService;
import rocket.jobrocketbackend.oauth.dto.CustomOAuth2User;

import java.util.List;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<Long> sendMessage(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            @RequestParam String receiverName,
            @RequestBody String content
    ) {
        Long senderId = customOAuth2User.getId();
        Long noteId = noteService.sendMessage(senderId, receiverName, content);
        return ResponseEntity.ok(noteId);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResDto>> getConversations(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
    ) {
        Long userId = customOAuth2User.getId();
        List<ConversationResDto> conversations = noteService.getConversations(userId);
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<NoteResDto>> getMessages(
            @RequestParam Long conversationId,
            @RequestParam int page,
            @RequestParam int size
    ) {
        List<NoteResDto> messages = noteService.getMessages(conversationId, page, size);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/read/{noteId}")
    public ResponseEntity<Void> markMessageAsRead(@PathVariable Long noteId) {
        noteService.markMessageAsRead(noteId);
        return ResponseEntity.ok().build();
    }
}
