FROM ubuntu:22.04

ENV LANG de_DE.UTF-8
ENV LANGUAGE de_DE:de
ENV LC_ALL de_DE.UTF-8

RUN apt-get update && \
    apt-get install -y locales && \
    locale-gen de_DE.UTF-8 && \
    ln -fs /usr/share/zoneinfo/Europe/Berlin /etc/localtime && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get install -y tzdata && \
    dpkg-reconfigure --frontend noninteractive tzdata

WORKDIR /opt/blockly/
ADD ./closure-library.tgz ./build.sh ./

RUN apt-get -y install python2 npm

RUN npm install -g google-closure-compiler@20200719.0.0 && \
    npm install -g npx

VOLUME ["/opt/blockly/blockly/"]
RUN ln -s /usr/bin/python2 /usr/bin/python && \
    mkdir -p /opt/blockly/blockly/ && \
    chmod +x ./build.sh

ENTRYPOINT ["sh","./build.sh"]
