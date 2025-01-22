package rocket.jobrocketbackend.note.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rocket.jobrocketbackend.note.entity.ConversationEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface ConversationJpaRepository extends JpaRepository<ConversationEntity, Long> {

    @Query("SELECT c FROM ConversationEntity c WHERE (c.user1 = :user1 AND c.user2 = :user2) OR (c.user1 = :user2 AND c.user2 = :user1)")
    Optional<ConversationEntity> findByUsers(@Param("user1") UserEntity user1, @Param("user2") UserEntity user2);

    @Query("SELECT c FROM ConversationEntity c WHERE c.user1 = :user OR c.user2 = :user ORDER BY c.lastMessageTime DESC")
    List<ConversationEntity> findByUser(@Param("user") UserEntity user);
}