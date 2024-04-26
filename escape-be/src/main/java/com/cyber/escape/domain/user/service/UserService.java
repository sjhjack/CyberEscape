package com.cyber.escape.domain.user.service;

import com.cyber.escape.domain.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    public UserDto.NicknameResponse generateNickname(String format, int count){
        String url = "https://nickname.hwanmoo.kr/?format=" + format + "&count=" + count;
        RestTemplate restTemplate = new RestTemplate();
        UserDto.NicknameResponse nicknameResponse = restTemplate.getForObject(url, UserDto.NicknameResponse.class);
        return nicknameResponse;
    }
}
