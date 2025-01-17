package rocket.jobrocketbackend.board.free.dto.request;

import lombok.*;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.member.entity.MemberEntity;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class FreeBoardCreateRequest {
    private String title;
    private String content;


    public FreeBoardEntity toEntity(LocalDate today, MemberEntity user){
        return FreeBoardEntity.builder()
                .postDate(today)
                .user(user)
                .title(this.title)
                .content(this.content)
                .build();
    }

}
