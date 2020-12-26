FROM openjdk:8-jre-slim

ENV GEONTRACK_VERSION 4.11

WORKDIR /opt/traccar

RUN set -ex && \
    apt-get update &&\
    TERM=xterm DEBIAN_FRONTEND=noninteractive apt-get install --yes --no-install-recommends unzip wget && \
    apt-get autoremove --yes unzip wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/*

COPY 

ENTRYPOINT ["java", "-Xms512m", "-Xmx512m", "-Djava.net.preferIPv4Stack=true"]

CMD ["-jar", "tracker-server.jar", "conf/traccar.xml"]