package com.cyber.escape.domain.auth.security;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.cyber.escape.domain.auth.dto.CustomUser;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.util.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
	private final UserUtil userUtil;

	/**
	 *
	 * @param loginId 사용자 로그인 Id
	 */
	@Override
	public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
		User findUser = userUtil.findByLoginId(loginId);

		return new CustomUser(
			findUser.getLoginId(),
			findUser.getPassword(),
			new ArrayList<>()
		).toUser();
	}
}
