package com.cyber.escape.domain.auth.jwt;

import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.FilterExceptionHandler;
import com.cyber.escape.global.exception.TokenException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
	private static final String AUTHORIZATION_HEADER = "Authorization";
	private final TokenProvider tokenProvider;
	private final FilterExceptionHandler filterExceptionHandler;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		System.out.println("URI :::::::::: " + request.getRequestURI());

		// 1. 토큰이 필요하지 않은 API URL에 대해서 배열로 구성한다.
		List<String> list = Arrays.asList(
			"/auth/signup",		// 회원가입 페이지
			"/auth/signin",		// 로그인 페이지
			"/actuator",
			"/actuator/prometheus"
			// "/ws-stomp"			// STOMP
		);

		// 2. 토큰이 필요하지 않은 API URL의 경우 -> 로직 처리없이 다음 필터로 이동한다.
		if (list.contains(request.getRequestURI()) || request.getRequestURI().startsWith("/ws-stomp")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = resolveToken(request);
		log.info("JwtFilter ::::::::: resolvedToken = {}", token.toString());

		boolean isValidate = false;
		boolean isRefresh = false;
		try {
			isValidate = tokenProvider.validateToken(token);
		} catch (TokenException e) {
			if(! request.getRequestURI().equals("/auth/refresh")){
				// throw new TokenException(ExceptionCodeSet.TOKEN_EXPIRED);
				filterExceptionHandler.handleJwtFilterTokenException(response, e);
				return;	// 이거 박으니까 getWriter() 에러가 안 뜬다.
			} else {
				isRefresh = true;
			}
		}

		if((StringUtils.hasText(token) && isValidate) || isRefresh) {
			log.info("JwtFilter ::::::::: 유효한 토큰입니다.");
			//토큰 값에서 Authentication 값으로 가공해서 반환 후 저장
			Authentication authentication = tokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			log.info("JwtFilter ::::::::: Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
			log.info("JwtFilter ::::::::: Security Context에 저장되어 있는 인증 정보 입니다. '{}'", SecurityContextHolder.getContext().getAuthentication().getName());
		} else {
			log.info("JwtFilter ::::::::: 유효한 JWT 토큰이 없습니다.");
		}

		//다음 필터로 넘기기
		filterChain.doFilter(request, response);
	}

	/**
	 * HttpServletRequest에서 `Authorization` 헤더를 받음.
	 * 헤더에서 'Bearer'로 시작하는 토큰이 있으면 'Bearer' 부분 제거하고 토큰 값 반환 아니면 에러 터뜨림
	 * @param request
	 * @return
	 */
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		log.info("Token 확인 : {}", bearerToken);
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) return bearerToken.substring(7);

		throw new TokenException(ExceptionCodeSet.TOKEN_NOT_EXISTS);
	}
}
