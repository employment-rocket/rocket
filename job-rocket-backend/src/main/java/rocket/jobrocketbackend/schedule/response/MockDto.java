package rocket.jobrocketbackend.schedule.response;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MockDto {
    //todo 임시 객체 재활용시 type enum이나 객체형식으로 바꿀것
    ////document,first, second, final
    private long id;
    private String title;
    private String memo;
    private LocalDate dueDate;
    private String type;


    public static List<MockDto> getDocumentTypeMocks(){
        LocalDate localDate = LocalDate.of(2024, 12, 13);
        return List.of(
                new MockDto(1,"삼성전자","잘쓰자",localDate,"document"),
                new MockDto(2,"삼숭전자","진짜잘쓰자",localDate,"document"),
                new MockDto(3,"샘성전자","정말잘쓰자",localDate,"document"),
                new MockDto(4,"샘숭전자","최종잘쓰자",localDate,"document"),
                new MockDto(5,"송송전자","찐잘쓰자",localDate,"document")
        );
    }

    public static List<MockDto> getFirstTypeMocks(){
        LocalDate localDate = LocalDate.of(2024, 12, 12);
        return List.of(
                new MockDto(6,"네이버","잘쓰자",localDate,"first"),
                new MockDto(7,"누이버","진짜잘쓰자",localDate,"first"),
                new MockDto(8,"도이버","정말잘쓰자",localDate,"first"),
                new MockDto(9,"다이버","최종잘쓰자",localDate,"first"),
                new MockDto(10,"데이버","찐잘쓰자",localDate,"first")
        );
    }

    public static List<MockDto> getSecondTypeMocks(){
        LocalDate localDate = LocalDate.of(2024, 12, 11);
        return List.of(
                new MockDto(11,"카카오","잘쓰자",localDate,"second"),
                new MockDto(12,"캐캐오","진짜잘쓰자",localDate,"second"),
                new MockDto(13,"크크오","정말잘쓰자",localDate,"second")
        );
    }

    public static List<MockDto> getFinalTypeMocks(){
        LocalDate localDate = LocalDate.of(2024, 12, 11);
        return List.of(
                new MockDto(14,"bnk시스템","잘쓰자",localDate,"final")
        );
    }
}