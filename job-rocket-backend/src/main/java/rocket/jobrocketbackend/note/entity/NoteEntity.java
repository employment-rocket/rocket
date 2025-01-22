package rocket.jobrocketbackend.note.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity(name = "note")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NoteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Long senderId;
    private Long receiverId;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH-mm-ss")
    private LocalDateTime createdAt;

    private boolean isRead;

    public void markAsRead() {
        this.isRead = true;
    }
}
