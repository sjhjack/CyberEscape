package com.cyber.escape.domain.auth.util;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class TokenUtil {
	private final RedisTemplate<String, String> redisTemplate;
	private final UserUtil userUtil;

	public void setRefreshToken(String refreshToken) {
		redisTemplate.opsForValue().set(getKey(), refreshToken);
	}

	public String getRefreshToken() {
		return redisTemplate.opsForValue().get(getKey());
	}

	public boolean deleteRefreshToken() {
		return redisTemplate.delete(getKey());
	}

	private String getKey() {
		return "token" + userUtil.getLoginUserUuid();
	}

	public void checkRefreshTokenEquals(String refreshToken) {
		if(refreshToken.equals(getRefreshToken()) == false) {
			throw new RuntimeException("저장되어 있는 토큰과 일치하지 않습니다 !!!");
		}
	}
}

