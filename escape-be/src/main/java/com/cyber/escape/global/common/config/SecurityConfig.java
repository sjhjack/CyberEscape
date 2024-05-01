package com.cyber.escape.global.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
	private final AuthenticationConfiguration authenticationConfiguration;
	private final TokenProvider tokenProvider;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.cors(Customizer.withDefaults())
			// .csrf(CsrfConfigurer::disable)
			.csrf(AbstractHttpConfigurer::disable) //csrf 비활성
			.httpBasic(AbstractHttpConfigurer::disable) //HTTP 기본인증 비활성
			// 시큐리티가 세션을 만들지도 사용하지도 않음.
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			// .authorizeHttpRequests(r ->
			// 	// r.requestMatchers("/auth/**").authenticated()
			// 		// .requestMatchers("/**").permitAll()
			// 		// r.anyRequest().permitAll()
			// 	r.requestMatchers("/auth/**").permitAll()
			// 		.requestMatchers("/**").authenticated()
			// )

			.addFilterAfter(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)

		;
		return http.build();
	}
}
