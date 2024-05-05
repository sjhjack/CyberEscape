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
public class UserServiceImpl implements UserService, AuthService {
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
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

        signupRequest.setInfo(encodedPassword, randomNickname());

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
    public String quit() throws IOException{
        User findUser = UserUtil.getLoginUser(userRepository);

        deleteBeforeFile(findUser.getSavedFileName());
        findUser.initializeUserInfo();

        log.info("회원 탈퇴 성공 !!");
        return "";
    }

    @Override
    public String generateNickname(){
        return randomNickname();
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

        deleteBeforeFile(findUser.getSavedFileName());

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

    private static void deleteBeforeFile(String savedFileName) throws IOException {
        // Todo : 이걸 근데 삭제하는게 맞을까? 다른 사용자가 같은 이름으로 파일을 등록할 수도 있는 거잖아..?
        if(!savedFileName.equals(FileUtil.DEFAULT_FILE_NAME)) {
            log.info("이전 파일 삭제");
            // 현재 프로필 사진이 default가 아니면 S3에서 삭제
            FileUtil.deleteFile(savedFileName);
        }
    }

    private void loginIdValidationCheck(String loginId) {
        if(userRepository.existsByLoginId(loginId)) {
            throw new RuntimeException("존재하는 아이디입니다.");
        }
    }

    private String randomNickname(){
        // nickname 랜덤 생성 -> API 서버 속도 따라서 다른 듯 (5초까지 봤음,,)
        String url = "https://nickname.hwanmoo.kr/?format=text&count=1&max_length=20";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    public String putDummyImage(MultipartFile multipartFile) throws IOException {
        String originalFileName = multipartFile.getOriginalFilename();
        String savedFileName = FileUtil.makeFileName(originalFileName);
        String profileUrl = FileUtil.uploadFile(multipartFile, savedFileName);

        log.info("originalFileName : {}, savedFileName : {}, profileUrl : {}", originalFileName, savedFileName, profileUrl);

        return "";
    }
}
