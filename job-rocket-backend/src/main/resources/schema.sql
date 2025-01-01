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
                        CHECK (category IN ('CS', 'PERSONAL', 'COMPANY', 'INTRODUCE', 'REVIEW'))
);
CREATE TABLE personal (
                          qid BIGINT AUTO_INCREMENT PRIMARY KEY,
                          question VARCHAR(500) NOT NULL
);

-- schedule 테이블 생성
CREATE TABLE schedule (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          title VARCHAR(255) NOT NULL,
                          due_date DATE NOT NULL,
                          memo TEXT,
                          user_id BIGINT NOT NULL,
                          type VARCHAR(50) NOT NULL,
                          state VARCHAR(50) NOT NULL
);

ALTER TABLE schedule
    ADD CONSTRAINT chk_schedule_type CHECK (type IN ('Document', 'First', 'Second', 'Final'));

ALTER TABLE schedule
    ADD CONSTRAINT chk_schedule_state CHECK (state IN ('Ongoing', 'Fail', 'Passed'));
