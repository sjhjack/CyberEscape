package com.cyber.escape.domain.user.util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class UserUtil {

    private final UserRepository userRepository;

    public UserUtil(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * login_id로 사용자 검색
     * @param loginId
     * @return User Entity
     */
    public User findByLoginId(final String loginId) {
        log.info("UserUtil.findByLoginId ========== loginId : {}", loginId);
        return userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다."));
    }

    /**
     * 현재 로그인 한 사용자의 UUID 가져오기
     * @return 사용자의 UUID
     */
    public String getLoginUserUuid() {
        return getLoginUser().getUuid();
    }

    /**
     * 현재 로그인 한 사용자의 정보 가져오기
     * @return User Entity
     */
    public User getLoginUser() {
        return findByLoginId(getLoginIdFromContextHolder());
    }

    public String getLoginIdFromContextHolder() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public String randomNickname(){
        return NicknameGenerator.generateNickname();
    }

}
