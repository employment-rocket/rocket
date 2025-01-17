package rocket.jobrocketbackend.board.free.dto.request;

import lombok.*;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.user.entity.UserEntity;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class FreeBoardCreateRequest {
    private String title;
    private String content;


    public FreeBoardEntity toEntity(LocalDate today, UserEntity user){
        return FreeBoardEntity.builder()
                .postDate(today)
                .user(user)
                .title(this.title)
                .content(this.content)
                .build();
    }

}
