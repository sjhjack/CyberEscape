package com.cyber.escape.domain.thema.controller;


import com.cyber.escape.domain.thema.dto.ThemaDto;
import com.cyber.escape.domain.thema.service.ThemaService;
import com.cyber.escape.global.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/thema")
public class ThemaController {

    private final ThemaService themaService;

    public ThemaController(ThemaService themaService) {
        this.themaService = themaService;
    }

    @GetMapping("/list")
    public ApiResponse<List<ThemaDto>> getThemaInfo(){
        return new ApiResponse<>(HttpStatus.OK.value(), "테마 정보입니다.", themaService.getStandardThema());
    }
}
