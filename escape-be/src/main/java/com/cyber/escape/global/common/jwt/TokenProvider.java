// package com.cyber.escape.global.common.jwt;
//
// import java.security.Key;
// import java.util.ArrayList;
// import java.util.Date;
//
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Component;
//
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.MalformedJwtException;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.UnsupportedJwtException;
// import io.jsonwebtoken.io.Decoders;
// import io.jsonwebtoken.security.Keys;
// import lombok.extern.slf4j.Slf4j;
//
// @Component
// @Slf4j
// public class TokenProvider {
// 	private static final String AUTHORITIES_KEY = "Authentication";
// 	private static final String BEARER_TYPE = "Bearer ";
// 	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000L * 60 * 10; // * 60;
// 	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000L * 60 * 60 * 24 * 7;
// 	private final Key key;
//
// 	public TokenProvider(@Value("${secretKeyPlain}") String secretKey) {
// 		log.info("TokenProvider 생성자 짜잔 !!");
//
// 		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
// 		this.key = Keys.hmacShaKeyFor(keyBytes);
//
// 		// SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
// 		// this.key = secretKey;
// 	}
//
// 	public MemberDto.AuthResponse generateTokenResponse(Authentication auth) {
// 		long now = new Date().getTime();
//
// 		String accessToken = Jwts.builder()
// 			.setSubject(auth.getName())
// 			.setExpiration(new Date(now + ACCESS_TOKEN_EXPIRE_TIME))
// 			.signWith(key, SignatureAlgorithm.HS512)
// 			.compact();
//
// 		String refreshToken = Jwts.builder()
// 			.setSubject(auth.getName())
// 			.setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
// 			.signWith(key, SignatureAlgorithm.HS512)
// 			.compact();
//
// 		log.info("generateTokenResponse start =============");
// 		log.info("access : {}", accessToken.toString());
// 		log.info("refresh : {}", refreshToken.toString());
// 		log.info("generateTokenResponse end ===============");
//
// 		return MemberDto.AuthResponse.builder()
// 			.memberId(auth.getName())
// 			.grantType(BEARER_TYPE)
// 			.accessToken(accessToken)
// 			.refreshToken(refreshToken)
// 			.build();
// 	}
//
// 	public Authentication getAuthentication(String accessToken) {
// 		// Access Token 유효성 확인 및 파싱
// 		Claims claims = paresClaims(accessToken);
//
// 		// if (claims.get(AUTHORITIES_KEY) == null) {
// 		// 	throw new RuntimeException();
// 		// }
//
// 		UserDetails principal = new User(claims.getSubject(), "", new ArrayList<>());
//
// 		return new UsernamePasswordAuthenticationToken(principal, "");
// 	}
//
// 	public Authentication getPlainAuthentication(String accessToken) {
// 		// Access Token 유효성 확인 및 파싱
// 		String plainTextClaims = paresPlainTextClaims(accessToken);
//
// 		// if (claims.get(AUTHORITIES_KEY) == null) {
// 		// 	throw new RuntimeException();
// 		// }
//
// 		log.info("getPlainAuthentication ::::: plainTextClaims = {}", plainTextClaims.toString());
// 		UserDetails principal = new User(plainTextClaims.toString(), "", new ArrayList<>());
//
// 		return new UsernamePasswordAuthenticationToken(principal, "");
// 	}
//
// 	public boolean validateToken(String token) {
// 		try {
// 			// Refresh Token의 경우 파싱되기만 하면 OK
// 			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
// 			return true;
// 		} catch (SecurityException e) {
// 			handleSecurityException(e);
// 		} catch (MalformedJwtException e) {
// 			handleMalformedJwtException(e);
// 		} catch (ExpiredJwtException e) {
// 			handleExpiredJwtException(e);
// 		} catch (UnsupportedJwtException e) {
// 			handleUnsupportedJwtException(e);
// 		} catch (IllegalArgumentException e) {
// 			handleIllegalArgumentException(e);
// 		}
//
// 		return false;
// 	}
//
// 	private Claims paresClaims(String accessToken) {
// 		try {
// 			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
// 		} catch (ExpiredJwtException e) {
// 			return e.getClaims();
// 		}
// 	}
//
// 	private String paresPlainTextClaims(String accessToken) {
// 		try {
// 			return Jwts.parserBuilder().setSigningKey(key).build().parsePlaintextJws(accessToken).getBody();
// 		} catch (ExpiredJwtException e) {
// 			return e.getMessage();
// 		}
// 	}
//
//
// 	private void handleSecurityException(SecurityException e) {
// 		throw new CustomException("서명이 유효하지 않습니다.");
// 	}
//
// 	private void handleMalformedJwtException(MalformedJwtException e) {
// 		throw new CustomException("토큰의 형식이 올바르지 않습니다.");
// 	}
//
// 	private void handleExpiredJwtException(ExpiredJwtException e) {
// 		throw new TokenException("토큰의 유효 기간이 만료되었습니다.");
// 	}
//
// 	private void handleUnsupportedJwtException(UnsupportedJwtException e) {
// 		throw new CustomException("지원하지 않는 JWT 기능이 사용되었습니다.");
// 	}
//
// 	private void handleIllegalArgumentException(IllegalArgumentException e) {
// 		throw new CustomException("잘못된 인수가 전달되었습니다.");
// 	}
// }
