FROM python:3.7-alpine

COPY node /node

USER root

# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
#     apk update && \
#     apk add --no-cache git gcc g++ python python-dev py-pip mysql-dev openssl bash linux-headers libffi-dev openssl-dev curl wget

COPY requirements.txt /requirements.txt

RUN pip install -r requirements.txt

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod 777 /docker-entrypoint.sh

ENTRYPOINT ./docker-entrypoint.sh