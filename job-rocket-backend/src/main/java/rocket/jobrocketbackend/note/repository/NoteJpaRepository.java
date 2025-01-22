package rocket.jobrocketbackend.note.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rocket.jobrocketbackend.note.entity.NoteEntity;

import java.util.List;

@Repository
public interface NoteJpaRepository extends JpaRepository<NoteEntity, Long> {
    List<NoteEntity> findByReceiverIdAndIsReadFalse(Long receiverId);

    @Query("SELECT n FROM note n WHERE (n.senderId = :userId AND n.receiverId = :otherUserId) OR (n.senderId = :otherUserId AND n.receiverId = :userId) ORDER BY n.createdAt ASC")
    List<NoteEntity> findConversation(@Param("userId") Long userId, @Param("otherUserId") Long otherUserId);
}
