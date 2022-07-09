FROM gradle:jdk17

COPY ./ /app/

WORKDIR /app/

RUN gradle --no-daemon clean assemble

EXPOSE 8082

ENTRYPOINT ["java","-server","-Xms768m","-Xmx768m","-XX:MaxMetaspaceSize=256m","-XX:MetaspaceSize=256m","-XX:NativeMemoryTracking=detail","-jar","build/libs/city-list-core-api-0.0.1-SNAPSHOT.jar","--spring.profiles.active=docker"]