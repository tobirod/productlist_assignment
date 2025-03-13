# BUILD BACKEND WITH MAVEN
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . . 
RUN mvn clean package

# RUN APPLICATION WITH LIGHTWEIGHT JAVA IMAGE
FROM openjdk:21-jdk-slim
VOLUME /tmp
EXPOSE 8080
COPY --from=build /app/target/productlist-api-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
