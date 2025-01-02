package rocket.jobrocketbackend.question.cs.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @GeneratedValue
    private Long qid;
    private String question;
    private String subcategory;
    private String suggested;
}