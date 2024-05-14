package com.cyber.escape.global.common.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableRabbit
@Slf4j
public class RabbitConfig {
    // private static final String CHAT_QUEUE_NAME = "chat.queue";
    // private static final String CHAT_EXCHANGE_NAME = "chat.exchange";
    private static final String ROUTING_KEY = "game.room.*";
    private static final String CHAT_ROUTING_KEY = "chat.room.*";

    @Value("${rabbit.host}")
    private static String host;
    @Value("${rabbit.host}")
    public void setHost(String host) {
        RabbitConfig.host = host;
    }

    // @Value("${rabbit.queue-name}")
    // private static String CHAT_QUEUE_NAME;
    // @Value("${rabbit.exchange-name}")
    // private static String CHAT_EXCHANGE_NAME;
    // @Value("${rabbit.routing-key}")
    // private static String ROUTING_KEY;
    // @Value("${rabbit.user_name}")
    // private static String USER_NAME;
    // @Value("${rabbit.password}")
    // private static String PASSWORD;


    // Queue 등록
    @Bean
    public Queue queue(@Value("${rabbit.chat-queue-name}") String CHAT_QUEUE_NAME){
        log.info("queue 등록 !!");
        // return new Queue(CHAT_QUEUE_NAME, true);
        return new Queue(CHAT_QUEUE_NAME);
    }
    @Bean
    Queue chatQueue(@Value("${rabbit.chat-queue-name}") String CHAT_QUEUE_NAME){
        return new Queue(CHAT_QUEUE_NAME);
    }
    @Bean
    public TopicExchange exchange(@Value("${rabbit.exchange-name}") String CHAT_EXCHANGE_NAME){
        log.info("exchange 등록 !!");
        return new TopicExchange(CHAT_EXCHANGE_NAME);
    }

    // Exchange와 Queue 바인딩
    // 특정 Exchange가 특정 Queue로 매칭될지를 결정한다.

    // Topic Exchange : routing key 의 패턴을 만족하는 모든 queue에 전달한다.
//    @Bean
//    public Binding binding(Queue queue, TopicExchange exchange){
//        log.info("binding 등록 !!");
//        return BindingBuilder
//                .bind(queue)
//                .to(exchange)
//                .with(ROUTING_KEY);
//    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange){
        log.info("binding 등록 !!");
        return BindingBuilder
                .bind(queue)
                .to(exchange)
                .with(CHAT_ROUTING_KEY);
    }


    // RabbitMQ와의 메시지 통신을 담당하는 클래스
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        log.info("rabbitTemplate 등록 !!");
        return rabbitTemplate;
    }

    // RabbitMQ와의 연결을 관리하는 클래스
    @Bean
    public ConnectionFactory connectionFactory(@Value("${rabbit.username}") String USER_NAME, @Value("${rabbit.password}") String PASSWORD){
        log.info("connectionFactory 등록 !!");
        CachingConnectionFactory factory = new CachingConnectionFactory();
		factory.setHost(host);
        //factory.setHost("rabbitmq");
        factory.setPort(5672);
        // factory.setPort(58153);
        factory.setVirtualHost("/");	// ?? 이게 뭘까
        factory.setUsername(USER_NAME);
        factory.setPassword(PASSWORD);

        log.info("host : {}", factory.getHost());
        log.info("port : {}", factory.getPort());
        log.info("virtual host : {}", factory.getVirtualHost());
        log.info("username : {}", factory.getUsername());

        return factory;
    }

    // 메시지를 JSON 형식으로 직렬화하고 역직렬화하는데 사용되는 변환기
    // RabbitMQ 메시지를 JSON 형식으로 주고 받을 수 있음
    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }
}
