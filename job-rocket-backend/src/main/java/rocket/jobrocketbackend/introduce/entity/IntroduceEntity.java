package rocket.jobrocketbackend.introduce.entity;

import jakarta.persistence.*;
import lombok.*;
import rocket.jobrocketbackend.question.introduce_qa.entity.IntroduceQAEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "introduce")
public class IntroduceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "introduce_id")
    private Long introduceId;

    private String name;

    @Lob
    @Column(name = "file_data", nullable = false)
    private byte[] fileData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private UserEntity member;

    @OneToMany(mappedBy = "introduce", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<IntroduceQAEntity> questions = new ArrayList<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}