# Node.js 20 버전의 Alpine 이미지 사용
FROM node:20-alpine

# root에 /app 폴더 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# Next.js 빌드 결과물과 정적 파일을 /app에 복사
COPY ./escape-fe/ssafy-escape/* .

# npm install 실행
RUN npm install

# Next.js 애플리케이션 빌드
RUN npm run build

RUN export PATH=$PATH:/home/root/app

# 애플리케이션 실행
CMD ["npm", "start"]
