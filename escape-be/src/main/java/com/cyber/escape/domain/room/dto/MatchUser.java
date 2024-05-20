package com.cyber.escape.domain.room.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MatchUser {
	private String principalUuid;
	private String userUuid;

	public MatchUser(final String principalUuid, final String userUuid) {
		this.principalUuid = principalUuid;
		this.userUuid = userUuid;
	}
}
