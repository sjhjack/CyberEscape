package com.cyber.escape.domain.user.util;

import org.springframework.security.core.context.SecurityContextHolder;

import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserUtil {

    public static String getUserUuid(){
        return "c83e73a6-0470-11ef-9c95-0242ac101404";
    }
    public static String getAnotherUserUuid(){
        return "c83e8aea-0470-11ef-9c95-0242ac101404";
    }

    /**
     * login_id로 사용자 검색
     * @param userRepository
     * @param loginId
     * @return User Entity
     */
    public static User findByLoginId(final UserRepository userRepository, final String loginId) {
        log.info("UserUtil.findByLoginId ========== loginId : {}", loginId);
        return userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다."));
    }

    /**
     * 현재 로그인 한 사용자의 UUID 가져오기
     * @param userRepository
     * @return 사용자의 UUID
     */
    public static String getLoginUserUuid(final UserRepository userRepository) {
        return getLoginUser(userRepository).getUuid();
    }

    /**
     * 현재 로그인 한 사용자의 정보 가져오기
     * @param userRepository
     * @return User Entity
     */
    public static User getLoginUser(final UserRepository userRepository) {
        return findByLoginId(userRepository, getLoginIdFromContextHolder());
    }

    private static String getLoginIdFromContextHolder() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
