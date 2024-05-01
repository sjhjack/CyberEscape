package com.cyber.escape.domain.user.service;

import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.repository.FriendRepository;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public String signup(UserDto.SignupRequest signupRequest) {
        // loginId 중복 체크
        loginIdValidationCheck(signupRequest.getLoginId());
        // 비밀번호 암호화
        signupRequest.setPassword(bCryptPasswordEncoder.encode(signupRequest.getPassword()));
        // Todo : nickname, profile image 자동 생성
        // Todo : profile image S3에 저장 및 url 가져오기

        return userRepository.save(User.from(signupRequest)).getLoginId();
    }

    private void loginIdValidationCheck(String loginId) {
        if(userRepository.existsByLoginId(loginId)) {
            throw new RuntimeException("존재하는 아이디입니다.");
        }
    }

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

    public String changeNickname(UserDto.UpdateNicknameRequest dto){
        User user = userRepository.findUserByUuid(dto.getUserUuid())
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));

        // 새로운 닉네임 중복 검사
        if (userRepository.existsByNickname(dto.getNewNickname())) {
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");
        }
        String newNickname = dto.getNewNickname();
        if (newNickname.length() > 20) {
            throw new RuntimeException("닉네임은 최대 20자까지 가능합니다.");
        }
        // 새로운 닉네임의 길이를 한글 20자로 제한
//        String newNickname = dto.getNewNickname().substring(0, Math.min(dto.getNewNickname().length(), 20));

        // 기존 사용자의 닉네임 업데이트
        user.setNickname(newNickname);
        userRepository.save(user);

        return newNickname;
    }

}
