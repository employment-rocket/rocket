package rocket.jobrocketbackend.note.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import rocket.jobrocketbackend.note.entity.ConversationEntity;
import rocket.jobrocketbackend.note.entity.NoteEntity;

public interface NoteJpaRepository extends JpaRepository<NoteEntity, Long> {

    Page<NoteEntity> findByConversation(ConversationEntity conversation, Pageable pageable);
}