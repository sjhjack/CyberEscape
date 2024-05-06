package com.cyber.escape.domain.my_page.service;


import com.cyber.escape.domain.my_page.dto.MyPageDto;
import com.cyber.escape.domain.user.util.UserUtil;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {


    public MyPageDto.InfoResponse getMyInfo(){

        String userUuid = UserUtil.getUserUuid();
        return null;

    }
}
