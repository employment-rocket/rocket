package rocket.jobrocketbackend.question.cs.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cs")
public class CsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qid;
    private String question;
    private String subcategory;
    private String suggested;
}