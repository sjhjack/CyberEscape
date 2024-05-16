FROM rabbitmq

# 환경 변수 설정
ENV HOSTNAME=${RABBITMQ_HOST}
ENV RABBITMQ_DEFAULT_USER=${RABBITMQ_USERNAME}
ENV RABBITMQ_DEFAULT_PASS=${RABBITMQ_PASSWORD}

# 포트 노출
EXPOSE 5672 15672 61613

# RabbitMQ 플러그인 활성화 및 서버 시작을 위한 ENTRYPOINT
ENTRYPOINT rabbitmq-plugins enable rabbitmq_stomp && \
           rabbitmq-plugins enable rabbitmq_web_stomp && \
           rabbitmq-plugins enable rabbitmq_web_stomp_examples && \
           rabbitmq-plugins enable rabbitmq_mqtt && \
           rabbitmq-plugins enable rabbitmq_web_mqtt && \
           rabbitmq-plugins enable rabbitmq_web_mqtt_examples && \
           rabbitmq-plugins enable rabbitmq_management && \
           rabbitmq-plugins enable rabbitmq_federation && \
           rabbitmq-server

