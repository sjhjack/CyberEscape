package com.cyber.escape.domain.user.util;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.cyber.escape.domain.user.data.NicknameRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class NicknameGenerator {
	private static final String API_URL = "https://www.rivestsoft.com/nickname/getRandomNickname.ajax";

	private NicknameGenerator() {
		throw new IllegalCallerException("생성자를 선언할 수 없습니다.");
	}

	public static String generateNickname() {
		RestTemplate restTemplate = new RestTemplate();
		ObjectMapper objectMapper = new ObjectMapper();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		NicknameRequest nicknameRequest = new NicknameRequest("ko");

		HttpEntity<NicknameRequest> httpEntity = new HttpEntity<>(nicknameRequest, headers);
		String response = restTemplate.postForObject(API_URL, httpEntity, String.class);

		try {
			JsonNode jsonNode = objectMapper.readTree(response);
			return jsonNode.get("data").asText();
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}
}
