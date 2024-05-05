package com.cyber.escape.domain.user.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.cyber.escape.domain.auth.service.AuthService;
import com.cyber.escape.domain.friend.entity.Friend;
import com.cyber.escape.domain.friend.repository.FriendRepository;
import com.cyber.escape.domain.user.dto.UserDto;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.domain.auth.jwt.TokenProvider;
import com.cyber.escape.domain.user.repository.UserRepository;
import com.cyber.escape.domain.auth.util.TokenUtil;
import com.cyber.escape.domain.user.util.UserUtil;
import com.cyber.escape.global.common.util.FileUtil;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.FileException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    @Override
    public String generateNickname(){
        return UserUtil.randomNickname();
    }

    @Override
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

    @Override
    public UserDto.CheckNicknameResponse checkNickname(UserDto.CheckNicknameRequest request) {
        String nickname = request.getNickname();
        boolean isAvailable = !userRepository.existsByNickname(nickname);
        return UserDto.CheckNicknameResponse.builder()
                .isAvailable(isAvailable)
                .build();
    }

    @Transactional
    @Override
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

    @Transactional
    public String changeProfileImage(MultipartFile multipartFile) throws IOException {
        User findUser = UserUtil.getLoginUser(userRepository);

        FileUtil.deleteBeforeFile(findUser.getSavedFileName());

        String originalFileName = multipartFile.getOriginalFilename();
        String savedFileName = FileUtil.makeFileName(originalFileName);
        String profileUrl = FileUtil.uploadFile(multipartFile, savedFileName);

        findUser.changeProfileImage(savedFileName, profileUrl);

        return profileUrl;
    }

    @Transactional
    public String deleteProfileImage() throws IOException {
        User findUser = UserUtil.getLoginUser(userRepository);

        if(findUser.getSavedFileName().equals(FileUtil.DEFAULT_FILE_NAME)) {
            throw new FileException(ExceptionCodeSet.DELETE_DEFAULT_FILE);
        }

        FileUtil.deleteFile(findUser.getSavedFileName());
        findUser.changeProfileImage(FileUtil.DEFAULT_FILE_NAME, FileUtil.DEFAULT_FILE_URL);
        return "";
    }

    public String putDummyImage(MultipartFile multipartFile) throws IOException {
        String originalFileName = multipartFile.getOriginalFilename();
        String savedFileName = FileUtil.makeFileName(originalFileName);
        String profileUrl = FileUtil.uploadFile(multipartFile, savedFileName);

        log.info("originalFileName : {}, savedFileName : {}, profileUrl : {}", originalFileName, savedFileName, profileUrl);

        return "";
    }
}
