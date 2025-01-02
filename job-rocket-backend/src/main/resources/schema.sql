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

CREATE TABLE schedule (
	schedule_id	BIGINT	AUTO_INCREMENT PRIMARY KEY,
	member_id BIGINT NOT NULL,
	title	varchar(50)	,
	memo	varchar(300),
	due_date	date,
	type	varchar(20),
	state	varchar(20),
    FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);