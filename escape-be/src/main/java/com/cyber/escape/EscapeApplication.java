package com.cyber.escape;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing //리스너 넣을 때 사용
@PropertySource("classpath:/config-dev.yml")
public class EscapeApplication {

	public static void main(String[] args) {
		SpringApplication.run(EscapeApplication.class, args);
	}
}
