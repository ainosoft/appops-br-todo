FROM openjdk:8u252-slim
COPY env-config /app/env-config
COPY ${service-name}.jar /app
COPY Dockerfile /app/Dockerfile
COPY webapp /app/webapp
WORKDIR /app/
CMD ["java", "-jar", "${service-name}.jar", "--deployment.mode=STANDALONE"]