package rocket.jobrocketbackend.note.service;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import rocket.jobrocketbackend.note.dto.response.ConversationResDto;
import rocket.jobrocketbackend.note.dto.response.NoteResDto;
import rocket.jobrocketbackend.note.entity.ConversationEntity;
import rocket.jobrocketbackend.note.entity.NoteEntity;
import rocket.jobrocketbackend.note.repository.ConversationJpaRepository;
import rocket.jobrocketbackend.note.repository.NoteJpaRepository;
import rocket.jobrocketbackend.user.entity.UserEntity;
import rocket.jobrocketbackend.user.exception.UserNotFoundException;
import rocket.jobrocketbackend.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteJpaRepository noteRepository;
    private final ConversationJpaRepository conversationRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long sendMessage(Long senderId, String receiverName, String content) {
        UserEntity sender = findUserById(senderId);
        UserEntity receiver = findUserByNickname(receiverName);
        ConversationEntity conversation = findOrCreateConversation(sender, receiver);
        NoteEntity note = saveNote(conversation, sender, receiver, content);
        conversation.updateLastMessage(content, note.getCreatedAt());
        conversationRepository.save(conversation);
        return note.getId();
    }

    private ConversationEntity findOrCreateConversation(UserEntity sender, UserEntity receiver) {
        return conversationRepository.findByUsers(sender, receiver)
                .orElseGet(() -> conversationRepository.save(
                        ConversationEntity.builder()
                                .sender(sender)
                                .receiver(receiver)
                                .lastMessage("")
                                .lastMessageTime(LocalDateTime.now())
                                .build()
                ));
    }

    private NoteEntity saveNote(ConversationEntity conversation, UserEntity sender, UserEntity receiver, String content) {
        return noteRepository.save(
                NoteEntity.builder()
                        .conversation(conversation)
                        .sender(sender)
                        .receiver(receiver)
                        .content(content)
                        .isRead(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    private UserEntity findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
    }

    private UserEntity findUserByNickname(String nickname) {
        return userRepository.findByNickname(nickname)
                .orElseThrow(() -> new UserNotFoundException("User not found with nickname: " + nickname));
    }

    @Transactional(readOnly = true)
    public List<ConversationResDto> getConversations(Long userId) {
        UserEntity user = findUserById(userId);
        return conversationRepository.findByUser(user).stream()
                .map(conversation -> {
                    UserEntity otherUser = conversation.getSender().equals(user)
                            ? conversation.getReceiver()
                            : conversation.getSender();
                    long unreadMessageCount = conversation.getNotes().stream()
                            .filter(note -> !note.isRead() && note.getReceiver().equals(user))
                            .count();
                    return ConversationResDto.builder()
                            .conversationId(conversation.getId())
                            .lastMessage(conversation.getLastMessage())
                            .lastMessageTime(conversation.getLastMessageTime())
                            .otherUserName(otherUser.getNickname())
                            .otherUserProfile(otherUser.getProfile())
                            .unreadMessageCount((int) unreadMessageCount)
                            .build();
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NoteResDto> getMessages(Long conversationId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        ConversationEntity conversation = findConversationById(conversationId);
        Page<NoteEntity> notesPage = noteRepository.findByConversation(conversation, pageable);
        return notesPage.stream()
                .map(note -> NoteResDto.builder()
                        .id(note.getId())
                        .content(note.getContent())
                        .senderName(note.getSender().getNickname())
                        .receiverName(note.getReceiver().getNickname())
                        .createdAt(note.getCreatedAt())
                        .isRead(note.isRead())
                        .build())
                .toList();
    }

    @Transactional(readOnly = true)
    public NoteResDto getMessageById(Long noteId) {
        NoteEntity note = noteRepository.findById(noteId)
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        return NoteResDto.builder()
                .id(note.getId())
                .content(note.getContent())
                .senderName(note.getSender().getNickname())
                .receiverName(note.getReceiver().getNickname())
                .createdAt(note.getCreatedAt())
                .isRead(note.isRead())
                .build();
    }

    @Transactional
    public void markMessageAsRead(Long noteId) {
        NoteEntity note = noteRepository.findById(noteId)
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        note.markAsRead();
        noteRepository.save(note);
    }

    private ConversationEntity findConversationById(Long conversationId) {
        return conversationRepository.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));
    }
}
