package com.cyber.escape.domain.user.service;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
	private final UserRepository userRepository;

	/**
	 *
	 * @param loginId 사용자 로그인 Id
	 */
	@Override
	public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
		User findUser = userRepository.findByLoginId(loginId)
			.orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));
		// return null;
		// return new User(
		// findMember.getMemberId(),
		// findMember.getPassword(),
		// new ArrayList<>()
		// );
		UserDetails userDetails = new org.springframework.security.core.userdetails.User(
			findUser.getLoginId(),
			findUser.getPassword(),
			new ArrayList<>()
		);

		log.info("userDetails : {}", userDetails.toString());

		return userDetails;
	}
}
