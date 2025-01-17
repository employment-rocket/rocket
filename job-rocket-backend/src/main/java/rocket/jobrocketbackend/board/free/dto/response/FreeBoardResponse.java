package rocket.jobrocketbackend.board.free.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import rocket.jobrocketbackend.board.free.entity.FreeBoardEntity;

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

    public static List<FreeBoardResponse> mockDataList(){
        LocalDate date = LocalDate.of(2025, 01, 14);
        return List.of(new FreeBoardResponse(1L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(2L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(3L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(4L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(5L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(6L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(7L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(8L,"강한 흰수염고래","취직하는법좀요","제발요",date),
                new FreeBoardResponse(9L,"강한 흰수염고래","취직하는법좀요","제발요",date)
        );
    }

    public static FreeBoardResponse from(FreeBoardEntity entity){
        return FreeBoardResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .nickName(entity.getUser().getNickname())
                .postDate(entity.getPostDate()).build();
    }
}

