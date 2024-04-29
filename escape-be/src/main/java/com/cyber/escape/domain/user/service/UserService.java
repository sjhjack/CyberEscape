package com.cyber.escape.domain.user.service;

import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.repository.FriendRepository;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    public UserDto.NicknameResponse generateNickname(String format, int count){
        String url = "https://nickname.hwanmoo.kr/?format=" + format + "&count=" + count;
        RestTemplate restTemplate = new RestTemplate();
        UserDto.NicknameResponse nicknameResponse = restTemplate.getForObject(url, UserDto.NicknameResponse.class);
        return nicknameResponse;
    }

    public UserDto.SearchNicknameResponse searchNickname(UserDto.SearchNicknameRequest dto){
        User toUser = userRepository.findUserByNickname(dto.getNickname())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));// 검색 당한 사람

        String fromUserUuid = dto.getFromUserUuid();
        Optional<Friend> friend = friendRepository.getFriend(fromUserUuid, toUser.getUuid());
        String relationship = friend.isPresent() ? "친구" : "추가";

        return UserDto.SearchNicknameResponse.builder()
                .nickname(dto.getNickname())
                .relationship(relationship)
                .build();
    }

    public UserDto.CheckNicknameResponse checkNickname(UserDto.CheckNicknameRequest request) {
        String nickname = request.getNickname();
        boolean isAvailable = !userRepository.existsByNickname(nickname);
        return UserDto.CheckNicknameResponse.builder()
                .isAvailable(isAvailable)
                .build();
    }

}
