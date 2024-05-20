package com.cyber.escape.domain.room.utils;

import com.cyber.escape.domain.room.entity.Room;
import com.cyber.escape.domain.room.repository.RoomRepository;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import com.cyber.escape.global.exception.RoomException;

public class RoomServiceUtils {

	private RoomServiceUtils() {
		throw new IllegalCallerException();
		// 굳이 클래스를 생성할 이유 없이 findByUuid()만 사용하면 되므로 생성 못하게 막는다.
	}
	
	// POJO이므로 메모리에 올려서 사용하기 위해 static 선언
	public static Room findByUuid(
		final RoomRepository repository,
		final String uuid
	) {
		// 여기서 validation check까지 수행한다.
		return repository.findRoomByUuid(uuid)
			.orElseThrow(() -> new RoomException(ExceptionCodeSet.ROOM_NOT_FOUND));
	}
}

