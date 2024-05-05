package com.cyber.escape.domain.auth.service;

import java.io.IOException;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cyber.escape.domain.auth.jwt.TokenProvider;
import com.cyber.escape.domain.auth.util.TokenUtil;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.util.FileUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.UserException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final TokenProvider tokenProvider;
	private final TokenUtil tokenUtil;

	@Transactional
	@Override
	public String signup(UserDto.SignupRequest signupRequest) {
		// loginId 중복 체크
		loginIdValidationCheck(signupRequest.getLoginId());
		// 비밀번호 암호화
		String encodedPassword = bCryptPasswordEncoder.encode(signupRequest.getPassword());

		signupRequest.setInfo(encodedPassword, UserUtil.randomNickname());

		return userRepository.save(User.from(signupRequest)).getLoginId();
	}

	@Transactional
	@Override
	public UserDto.SigninResponse signin(UserDto.SigninRequest signinRequest) {
		log.info("signin start !!");

		Authentication authentication = authenticationManagerBuilder.getObject()
			.authenticate(signinRequest.toAuthentication());
		SecurityContextHolder.getContext().setAuthentication(authentication);

		UserDto.SigninResponse signinResponse = tokenProvider.generateTokenResponse(authentication);

		// Refresh Token Redis에 저장
		tokenUtil.setRefreshToken(signinResponse.getRefreshToken());

		return signinResponse;
	}

	@Override
	public UserDto.SigninResponse reIssue(UserDto.SigninResponse tokenRequest) {
		log.info("reissue start !!");

		// Refresh Token 파싱되면 OK
		tokenProvider.validateToken(tokenRequest.getRefreshToken());
		// Redis에 저장되어있는 Refresh Token과 Request로 받은 Refresh Token 비교
		tokenUtil.checkRefreshTokenEquals(tokenRequest.getRefreshToken());
		// Context Holder에 있는 인증 객체 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("UserService.reIssue :::::::::: 저장되어 있는 인증 객체 {}", authentication.getName());
		// 인증 객체로 토큰 재발행
		UserDto.SigninResponse signinResponse = tokenProvider.generateTokenResponse(authentication);
		// Refresh Token Redis에 저장
		tokenUtil.setRefreshToken(signinResponse.getRefreshToken());

		return signinResponse;
	}

	@Override
	public String logout() {
		// 이거 근데 return 값으로 뭘 줘야 하지?
		tokenUtil.deleteRefreshToken();

		log.info("logout 성공 !!");
		return "";
	}

	@Transactional
	@Override
	public String quit() throws IOException {
		User findUser = UserUtil.getLoginUser(userRepository);

		FileUtil.deleteBeforeFile(findUser.getSavedFileName());
		findUser.initializeUserInfo();

		log.info("회원 탈퇴 성공 !!");
		return "";
	}

	private void loginIdValidationCheck(String loginId) {
		if(userRepository.existsByLoginId(loginId)) {
			throw new UserException(ExceptionCodeSet.LOGINID_DUPLICATED);
		}
	}
}
