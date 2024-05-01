package com.cyber.escape.domain.user.util;


import org.springframework.stereotype.Component;

import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Component
public class UserUtil {
    public static String getUserUuid(){
        return "c83e73a6-0470-11ef-9c95-0242ac101404";
    }
    public static String getAnotherUserUuid(){
        return "c83e8aea-0470-11ef-9c95-0242ac101404";
    }

    public static User findByLoginId(final UserRepository userRepository, final String loginId) {
        return userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다."));
    }
}
