package com.cyber.escape.domain.auth.service.impl;

import java.io.IOException;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cyber.escape.domain.auth.jwt.TokenProvider;
import com.cyber.escape.domain.auth.service.AuthService;
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
	private static final String LOGIN_ID_PATTERN = "^[a-zA-Z0-9]{3,20}$";
	private static final String PASSWORD_PATTERN = "^[a-zA-Z0-9]{6,20}$";

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final TokenProvider tokenProvider;
	private final TokenUtil tokenUtil;
	private final UserUtil userUtil;

	@Transactional
	@Override
	public String signup(UserDto.SignupRequest signupRequest) {
		// 유효성 검사
		signupValidationCheck(signupRequest);
		// 비밀번호 암호화
		String encodedPassword = bCryptPasswordEncoder.encode(signupRequest.getPassword());

		signupRequest.setInfo(encodedPassword, userUtil.randomNickname());

		return userRepository.save(User.from(signupRequest)).getLoginId();
	}

	@Transactional
	@Override
	public UserDto.SigninResponse signin(UserDto.SigninRequest signinRequest) {
		log.info("signin start !!");
		log.info("로그인 쓰레드 : {}", Thread.currentThread().getName());

		Authentication authentication = authenticationManagerBuilder.getObject()
			.authenticate(signinRequest.toAuthentication());
		SecurityContextHolder.getContext().setAuthentication(authentication);

		log.info("로그인 후 Context Holder에 저장된 Authetication : {}", SecurityContextHolder.getContext().getAuthentication().toString());

		UserDto.SigninResponse signinResponse = tokenProvider.generateTokenResponse(authentication);
		signinResponse.setUserInfo(userUtil.getLoginUser());

		// Refresh Token Redis에 저장
		tokenUtil.setRefreshToken(signinResponse.getRefreshToken());

		return signinResponse;
	}

	@Override
	public UserDto.SigninResponse reIssue(UserDto.SigninResponse tokenRequest) {
		log.info("reissue start !! ========================");
		log.info("request refreshToken : {}", tokenRequest.getRefreshToken());

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

		log.info("reissue end !! ========================");

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
		User findUser = userUtil.getLoginUser();

		FileUtil.deleteBeforeFile(findUser.getSavedFileName());
		findUser.initializeUserInfo();

		log.info("회원 탈퇴 성공 !!");
		return "";
	}

	private void signupValidationCheck(UserDto.SignupRequest signupRequest) {
		loginIdValidationCheck(signupRequest.getLoginId());
		passwordValidationCheck(signupRequest.getPassword());
	}

	private void loginIdValidationCheck(String loginId) {
		if(userRepository.existsByLoginId(loginId)) {
			throw new UserException(ExceptionCodeSet.LOGINID_DUPLICATED);
		}
		if (!loginId.matches(LOGIN_ID_PATTERN)) {
			throw new UserException(ExceptionCodeSet.INVALID_LOGINID_FORMAT);
		}
	}

	private void passwordValidationCheck(String password) {
		if (!password.matches(PASSWORD_PATTERN)) {
			throw new UserException(ExceptionCodeSet.INVALID_PASSWORD_FORMAT);
		}
	}
}
