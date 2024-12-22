# MySQL 8.0 기반 이미지
FROM mysql:8.0

# 환경 변수 설정
ENV MYSQL_ROOT_PASSWORD=1234

COPY init.sql /docker-entrypoint-initdb.d/

# 포트 노출
EXPOSE 3306