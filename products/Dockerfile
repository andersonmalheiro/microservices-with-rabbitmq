FROM adoptopenjdk/openjdk11:alpine

VOLUME /app

COPY build/libs/products-api-*SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]