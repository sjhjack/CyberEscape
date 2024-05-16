package com.cyber.escape.domain.user.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.cyber.escape.global.common.enums.FileType;
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
    private final UserUtil userUtil;

    @Override
    public String generateNickname(){
        return userUtil.randomNickname();
    }

    @Override
    public List<UserDto.SearchNicknameResponse> searchNickname(UserDto.SearchNicknameRequest dto){

        List<UserDto.SearchNicknameResponse> userSearchList = new ArrayList<>();

        // 검색 결과
        List<User> toUser = userRepository.findByNicknameContainingIgnoreCase(dto.getNickname());
        String currentUserUuid = userUtil.getLoginUserUuid();

        for(User user : toUser){
            log.info("nickname : {}, loginId : {}", user.getNickname(), user.getLoginId());
            // 닉네임을 가진 유저와 현재 내가 친구인지를 확인한다.
            Optional<Friend> friend = friendRepository.getFriend(currentUserUuid, user.getUuid());
            String relationship = friend.isPresent() ? "친구" : "추가";

            UserDto.SearchNicknameResponse result =
                    UserDto.SearchNicknameResponse.builder()
                    .nickname(user.getNickname())
                    .userUuid(user.getUuid())
                    .profileUrl(user.getProfileUrl())
                    .relationship(relationship)
                    .build();

            userSearchList.add(result);
        }

        return userSearchList;
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

        String currentUserUuid = userUtil.getLoginUserUuid();
        User user = userRepository.findUserByUuid(currentUserUuid)
                .orElseThrow(() -> new RuntimeException("일치하는 사용자 없음"));

        String newNickname = dto.getNewNickname();
        checkNicknameValidation(newNickname);

        // 기존 사용자의 닉네임 업데이트
        user.setNickname(newNickname);
        userRepository.save(user);

        return newNickname;
    }

    private void checkNicknameValidation(String newNickname) {
        // 새로운 닉네임 중복 검사
        if (userRepository.existsByNickname(newNickname)) {
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");
        }
        if (newNickname.length() > 20) {
            throw new RuntimeException("닉네임은 최대 20자까지 가능합니다.");
        }
    }

    @Transactional
    public String changeProfileImage(MultipartFile multipartFile) throws IOException {
        User findUser = userUtil.getLoginUser();

        FileUtil.deleteBeforeFile(findUser.getSavedFileName());

        String originalFileName = multipartFile.getOriginalFilename();
        String savedFileName = FileUtil.makeFileName(originalFileName);
        String profileUrl = FileUtil.uploadFile(multipartFile, FileType.profiles, savedFileName);

        findUser.changeProfileImage(savedFileName, profileUrl);

        return profileUrl;
    }

    @Transactional
    public String deleteProfileImage() throws IOException {
        User findUser = userUtil.getLoginUser();

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
        String profileUrl = FileUtil.uploadFile(multipartFile, FileType.profiles, savedFileName);

        log.info("originalFileName : {}, savedFileName : {}, profileUrl : {}", originalFileName, savedFileName, profileUrl);

        return "";
    }
}
