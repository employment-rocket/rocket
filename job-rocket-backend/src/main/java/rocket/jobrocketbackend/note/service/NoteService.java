package rocket.jobrocketbackend.note.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rocket.jobrocketbackend.note.dto.response.NoteResDto;
import rocket.jobrocketbackend.note.entity.NoteEntity;
import rocket.jobrocketbackend.note.repository.NoteJpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteJpaRepository noteJpaRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public NoteResDto saveMessage(NoteResDto dto) {
        NoteEntity savedNote = noteJpaRepository.save(NoteEntity.builder()
                .content(dto.getContent())
                .senderId(Long.parseLong(dto.getSenderName()))
                .receiverId(dto.getReceiverName())
                .createdAt(LocalDateTime.now())
                .isRead(false)
                .build());

        return mapToDto(savedNote);
    }

    @Transactional(readOnly = true)
    public List<NoteResDto> getUnreadMessages(Long receiverId) {
        List<NoteEntity> unreadMessages = noteJpaRepository.findByReceiverIdAndIsReadFalse(receiverId);
        return unreadMessages.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NoteResDto> getConversation(Long userId, Long otherUserId) {
        List<NoteEntity> conversation = noteJpaRepository.findConversation(userId, otherUserId);
        return conversation.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markMessagesAsRead(Long receiverId) {
        List<NoteEntity> unreadMessages = noteJpaRepository.findByReceiverIdAndIsReadFalse(receiverId);
        unreadMessages.forEach(NoteEntity::markAsRead);
    }

    @Transactional
    public NoteResDto saveAndBroadcast(NoteResDto dto) {
        NoteEntity savedNote = noteJpaRepository.save(NoteEntity.builder()
                .content(dto.getContent())
                .senderId(Long.parseLong(dto.getSenderName()))
                .receiverId(dto.getReceiverName())
                .createdAt(LocalDateTime.now())
                .isRead(false)
                .build());

        NoteResDto response = mapToDto(savedNote);

        messagingTemplate.convertAndSend("/topic/messages", response);
        return response;
    }

    private NoteResDto mapToDto(NoteEntity note) {
        return NoteResDto.builder()
                .id(note.getId())
                .content(note.getContent())
                .senderName(String.valueOf(note.getSenderId()))
                .receiverName(note.getReceiverId())
                .createdAt(note.getCreatedAt())
                .isRead(note.isRead())
                .build();
    }
}
