package rocket.jobrocketbackend.member.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;

@RequiredArgsConstructor
@Component
public class NicknameGenerator {

    private static final String[] ADJECTIVES = {
            "바위먹은", "빠른", "용감한", "푸른", "행복한", "귀여운", "고요한", "강한", "구르는", "산뜻한",
            "차가운", "뜨거운", "미스터리한", "조용한", "황금빛", "빛나는", "당당한", "기쁜", "자유로운", "멋진",
            "어두운", "밝은", "포근한", "상쾌한", "지혜로운", "고결한", "소박한", "화려한", "깔끔한", "정직한",
            "강렬한", "매력적인", "달리는", "슬픈", "순수한", "여유로운", "인내심 강한", "정의로운", "은밀한", "대담한",
            "사랑스러운", "넉넉한", "특별한", "자상한", "재치있는", "신비한", "혼자서도 강한", "용의자적인", "전설적인", "신뢰하는",
            "창의적인", "힘든", "재능있는", "차분한", "미친", "긍정적인", "세련된", "실험적인", "편안한", "강직한",
            "정열적인", "섬세한", "호기심이 많은", "연애하는", "도전적인", "위험한", "놀라운", "웅장한", "진지한", "매우 친근한",
            "겁이 없는", "달콤한", "자신감 있는", "강력한", "깨끗한", "거짓말 치는", "과감한", "부드러운", "유머러스한", "너그러운",
            "침착한", "타고난", "개성있는", "뛰어난", "감동적인", "파괴적인", "선명한", "성실한", "흔치않은", "찬란한",
            "배려하는", "무뚝뚝한", "열정적인", "도도한", "어려운", "사려 깊은", "참신한", "모험적인", "심려깊은 ", "귀족적인"
    };

    private static final String[] COLORS = {"흰색", "검정", "파란", "초록", "빨간", "노란", "보라색", "갈색", "주황색", "남색"};

    private static final String[] ANIMALS = {
            "고양이", "개", "호랑이", "토끼", "거북이", "사자", "곰", "늑대", "여우", "펭귄",
            "기린", "코끼리", "원숭이", "캥거루", "악어", "다람쥐", "독수리", "앵무새", "너구리", "하마",
            "펠리컨", "치타", "코알라", "고래", "돌고래", "상어", "해파리", "북극곰", "바다거북", "비버",
            "말", "물고기", "쥐", "햄스터", "다이너소어", "벌", "쏘가리", "산양", "칼새", "까마귀",
            "구렁이", "용", "타조", "토끼", "족제비", "미어캣", "두더지", "오리", "버팔로", "모래여우"
    };


    private static Random random = new Random();

    public static String generateNickname() {
        String adjective = ADJECTIVES[random.nextInt(ADJECTIVES.length)];
        String color = COLORS[random.nextInt(COLORS.length)];
        String animal = ANIMALS[random.nextInt(ANIMALS.length)];
        return adjective + " " + color + " " + animal;
    }
}
