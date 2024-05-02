package com.cyber.escape.domain.user.util;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.cyber.escape.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class TokenUtil {
	private final RedisTemplate<String, String> redisTemplate;
	private final UserRepository userRepository;

	public void setRefreshToken(String refreshToken) {
		redisTemplate.opsForValue().set("token" + UserUtil.getLoginUserUuid(userRepository), refreshToken);
	}

	public String getRefreshToken() {
		return redisTemplate.opsForValue().get("token" + UserUtil.getLoginUserUuid(userRepository));
	}

	public boolean deleteRefreshToken() {
		return redisTemplate.delete("token" + UserUtil.getLoginUserUuid(userRepository));
	}

	public void checkRefreshTokenEquals(String refreshToken) {
		if(refreshToken.equals(getRefreshToken()) == false) {
			throw new RuntimeException("저장되어 있는 토큰과 일치하지 않습니다 !!!");
		}
	}
}

