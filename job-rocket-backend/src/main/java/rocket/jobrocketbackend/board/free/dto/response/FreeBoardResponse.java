package rocket.jobrocketbackend.board.free.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;
import rocket.jobrocketbackend.common.entity.Profile;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Builder
public class FreeBoardResponse {


    private Long id;
    private String nickName;
    private String title;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate postDate;
    private String profile;
    private Long userId;

    public static FreeBoardResponse from(FreeBoardEntity entity){
        return FreeBoardResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .userId(entity.getUser().getId())
                .nickName(entity.getUser().getNickname())
                .profile(entity.getUser().getProfile())
                .postDate(entity.getPostDate()).build();
    }
}

