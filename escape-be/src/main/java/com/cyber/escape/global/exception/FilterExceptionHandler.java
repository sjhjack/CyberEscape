package com.cyber.escape.global.exception;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import com.cyber.escape.global.common.dto.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;

@Component
public class FilterExceptionHandler {
	public void handleJwtFilterTokenException(HttpServletResponse response, TokenException exception) throws
		IOException {
		ExceptionCodeSet exceptionCodeSet = exception.getExceptionCode();
		ApiResponse<String> apiResponse = ApiResponse.error(exceptionCodeSet.getStatus(), exceptionCodeSet.getMessage());

		response.setCharacterEncoding("UTF-8");
		response.setStatus(HttpStatus.OK.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.getWriter().write(new ObjectMapper().writeValueAsString(apiResponse));
	}

}
