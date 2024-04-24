package com.cyber.escape.domain.room.data;

public record RoomUpdateSetting(
	String title,
	String password
) {
	public static RoomUpdateSetting of(
		final String newTitle,
		final String newPassword
	) {
		return new RoomUpdateSetting(newTitle, newPassword);
	}
}
