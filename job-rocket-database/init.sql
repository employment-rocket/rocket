-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS erocket;
ALTER DATABASE erocket DEFAULT CHARACTER SET UTF8;
-- erocket DB 사용
USE erocket;

-- member 테이블 생성
CREATE TABLE member (
    member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    nickname VARCHAR(100),
    profile VARCHAR(255),
    allow_email BOOLEAN,
    refresh_token VARCHAR(255)
);

-- cs 테이블 생성
CREATE TABLE cs (
    qid BIGINT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    subcategory VARCHAR(100),
    suggested VARCHAR(500)
);

-- answer 테이블 생성
CREATE TABLE answer (
    answer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    qid BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    content TEXT,
    category VARCHAR(50) NOT NULL,
    is_in BOOLEAN,
    FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE,
    FOREIGN KEY (qid) REFERENCES cs(qid) ON DELETE CASCADE,
    CHECK (category IN ('CS', 'PERSONAL', 'COMPANY_QA', 'INTRODUCE_QA', 'REVIEW_QA'))
);

-- personal 테이블 생성
CREATE TABLE personal (
    qid BIGINT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL
);

-- schedule 테이블 생성
CREATE TABLE schedule (
    schedule_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    title VARCHAR(50),
    memo VARCHAR(300),
    due_date DATE,
    type VARCHAR(20),
    state VARCHAR(20),
    FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);

-- introduce 테이블 생성
CREATE TABLE introduce (
    introduce_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    file_data LONGBLOB NOT NULL,
    member_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);

-- introduce_qa 테이블 생성
CREATE TABLE introduce_qa (
    qid BIGINT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    introduce_id BIGINT NOT NULL,
    FOREIGN KEY (introduce_id) REFERENCES introduce(introduce_id) ON DELETE CASCADE
);


-- member 테이블 INSERT
INSERT INTO member (member_id,email, role, nickname, profile, allow_email, refresh_token)
VALUES (1,'testuser@example.com', 'MEMBER', '테스트유저', 'default-profile.png', true, 'sample-refresh-token');

-- cs 테이블 INSERT
INSERT INTO cs (qid, question, subcategory, suggested) VALUES
                                                           (1, '네트워크란 무엇인가요?', '네트워크', '네트워크는 장치 간 연결을 통해 데이터가 전달되는 시스템입니다.'),
                                                           (2, 'OSI 7계층에 대해 설명해주세요.', '네트워크', 'OSI 모델은 물리, 데이터 링크, 네트워크, 전송, 세션, 표현, 응용 계층으로 구성됩니다.'),
                                                           (3, '데이터베이스란 무엇인가요?', '데이터베이스', '데이터베이스는 데이터를 저장하고 관리하는 체계적인 컬렉션입니다.'),
                                                           (4, 'ACID 속성에 대해 설명해주세요.', '데이터베이스', 'ACID 속성은 원자성, 일관성, 격리성, 지속성을 의미합니다.'),
                                                           (5, '운영체제란 무엇인가요?', '운영체제', '운영체제는 컴퓨터 하드웨어와 소프트웨어를 관리하는 시스템 소프트웨어입니다.'),
                                                           (6, '교착상태(Deadlock)에 대해 설명해주세요.', '운영체제', '교착상태는 두 개 이상의 프로세스가 서로의 작업 완료를 방해하여 무한히 대기하는 상태입니다.'),
                                                           (7, '스택과 큐의 차이점은 무엇인가요?', '자료구조', '스택은 LIFO(후입선출), 큐는 FIFO(선입선출) 방식으로 데이터를 처리합니다.'),
                                                           (8, '이진 탐색(Binary Search)에 대해 설명해주세요.', '자료구조', '이진 탐색은 정렬된 데이터에서 특정 값을 효율적으로 찾는 알고리즘입니다.'),
                                                           (9, '트리(Tree)와 그래프(Graph)의 차이점은 무엇인가요?', '자료구조', '트리는 계층적 구조를 가지며, 그래프는 순환이 가능한 연결 구조를 가질 수 있습니다.'),
                                                           (10, 'SQL과 NoSQL의 차이점은 무엇인가요?', '데이터베이스', 'SQL은 관계형 데이터베이스에서 사용되고, NoSQL은 비관계형 데이터베이스에서 사용됩니다.');

-- answer 테이블 INSERT
INSERT INTO answer (qid, member_id, content, category, is_in)
VALUES
    (1, 1, '네트워크 질문에 대한 답변 예시', 'CS', true),
    (2, 1, '데이터베이스 질문에 대한 답변 예시', 'CS', true),
    (3, 1, '운영체제 질문에 대한 답변 예시', 'CS', false),
    (4, 1, '자료구조 질문에 대한 답변 예시', 'CS', true),
    (5, 1, '추가적인 네트워크 질문 답변 예시', 'CS', false);

-- personal 테이블 INSERT
INSERT INTO personal (question) VALUES
                                    ('1분 자기소개를 해주세요.'),
                                    ('본인의 가장 큰 강점은 무엇인가요?'),
                                    ('최근에 실패한 경험과 그로부터 배운 점은 무엇인가요?'),
                                    ('가장 도전적이었던 프로젝트에 대해 설명해주세요.'),
                                    ('팀 내에서 갈등이 있었던 경험과 해결 방법은 무엇인가요?'),
                                    ('가장 자랑스러운 성취는 무엇인가요?'),
                                    ('본인의 단점을 어떻게 극복했나요?'),
                                    ('10년 후 본인의 모습을 상상해보세요.'),
                                    ('회사에서 가장 중요한 가치는 무엇이라고 생각하나요?'),
                                    ('본인이 이 직무에 적합하다고 생각하는 이유는 무엇인가요?');

-- schedule 테이블 INSERT
INSERT INTO schedule (title, due_date, memo, member_id, type, state) VALUES
                                                                         ('서류 전형 제출', '2025-01-15', '서류 전형 마감일까지 제출해야 합니다.', 1, 'Document', 'Ongoing'),
                                                                         ('1차 면접 준비', '2025-01-20', '1차 면접 예상 질문 준비 및 복습.', 1, 'First', 'Ongoing'),
                                                                         ('2차 면접', '2025-01-25', '2차 면접에서 프로젝트 경험 강조.', 1, 'Second', 'Ongoing'),
                                                                         ('최종 면접 일정 확인', '2025-01-30', '최종 면접 장소 및 시간 확인.', 1, 'Final', 'Ongoing'),
                                                                         ('서류 전형 결과 발표', '2025-01-18', '서류 탈락.', 1, 'Document', 'Fail'),
                                                                         ('1차 면접 결과 발표', '2025-01-22', '1차 면접 통과.', 1, 'First', 'Passed'),
                                                                         ('2차 면접 준비', '2025-01-28', '2차 면접 예상 질문 준비.', 1, 'Second', 'Ongoing'),
                                                                         ('최종 합격 발표', '2025-02-01', '최종 합격 축하합니다!', 1, 'Final', 'Passed'),
                                                                         ('서류 전형 지원', '2025-01-10', '서류 전형 지원 완료.', 1, 'Document', 'Passed'),
                                                                         ('1차 면접 일정 확인', '2025-01-17', '1차 면접 일정 확인 완료.', 1, 'First', 'Ongoing');
INSERT INTO introduce (name, file_data, member_id, created_at)
VALUES
    ('자소서1', X'4444554D4D595F44415441', 1, '2023-01-01 10:00:00'),
    ('자소서2', X'4444554D4D595F44415441', 1, '2023-02-01 11:00:00'),
    ('자소서3', X'4444554D4D595F44415441', 1, '2023-03-01 12:00:00');

INSERT INTO introduce_qa (question, introduce_id)
VALUES
    ('이 회사에 지원한 이유는 무엇인가요?', 1),
    ('본인의 가장 큰 강점은 무엇인가요?', 1),
    ('본인의 단점을 어떻게 극복하고 있나요?', 1),
    ('5년 후 본인의 모습은 어떤 모습인가요?', 1),
    ('팀 프로젝트에서 갈등을 어떻게 해결했나요?', 1),
    ('리더로서의 경험은 무엇인가요?', 1),
    ('이 직무에 필요한 핵심 역량은 무엇이라고 생각하나요?', 1);