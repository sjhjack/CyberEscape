package com.cyber.escape.domain.user.util;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class TokenUtil {
	private final RedisTemplate<String, String> redisTemplate;
	private final UserUtil userUtil;

	public void setRefreshToken(String refreshToken) {
		redisTemplate.opsForValue().set("token" + userUtil.getLoginMemberUuid(), refreshToken);
	}

	public String getRefreshToken() {
		return redisTemplate.opsForValue().get("token" + userUtil.getLoginMemberUuid());
	}

	public boolean deleteRefreshToken() {
		return redisTemplate.delete("token" + userUtil.getLoginMemberUuid());
	}

	public boolean checkRefreshTokenEquals(String refreshToken) {
		return refreshToken.equals(getRefreshToken());
	}
}

