FROM openjdk:17

COPY build/libs/city-list-core-api-0.0.1-SNAPSHOT.jar /app/city-list-core-api.jar

EXPOSE 8082

ENTRYPOINT ["java","-server","-Xms768m","-Xmx768m","-XX:MaxMetaspaceSize=256m","-XX:MetaspaceSize=256m","-XX:NativeMemoryTracking=detail","-jar","app/city-list-core-api.jar","--spring.profiles.active=docker"]