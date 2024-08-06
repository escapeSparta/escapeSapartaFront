FROM node:20.15.1 AS build-stage

# 2. 작업 디렉토리 설정
WORKDIR /build

# 3. package.json과 package-lock.json을 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. Vue 애플리케이션 빌드
#RUN npm run build

# 7. Nginx를 사용하여 서빙 단계
FROM nginx:stable-alpine

# 8. Nginx 설정 파일 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 9. 빌드된 파일들을 Nginx 웹 루트로 복사
#COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY /build/dist /usr/share/nginx/html

# 10. Nginx 서버 시작
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]