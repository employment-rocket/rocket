package rocket.jobrocketbackend.board.free.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.board.free.entity.FreeCommentEntity;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class FreeCommentResponse {

    private Long id;
    private String nickName;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate postDate;
    private String profile;
    private Long userId;

    public static FreeCommentResponse from(FreeCommentEntity entity){
        return FreeCommentResponse.builder()
                .id(entity.getCommentId())
                .content(entity.getContent())
                .userId(entity.getAuthor().getId())
                .nickName(entity.getAuthor().getNickname())
                .profile(entity.getAuthor().getProfile())
                .postDate(entity.getPostDate()).build();
    }

}
