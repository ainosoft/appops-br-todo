FROM openjdk:8u252-slim
COPY env-config /app/env-config
COPY TodoService.jar /app
COPY Dockerfile /app/Dockerfile
COPY webapp /app/webapp
WORKDIR /app/
CMD ["java", "-jar", "TodoService.jar", "--deployment.mode=STANDALONE"]
