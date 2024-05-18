package com.cyber.escape.domain.notification.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.cyber.escape.domain.notification.document.Notify;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

// @Getter
// @Builder
// @AllArgsConstructor
// @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotifyDto {
    // Todo : member의 unique 값을 뭐로 저장하냐에 따라서 id 타입 바꾸기
    // 지금은 Long id를 참조

    /*
        -- 게임룸 ---
		private final String roomUuid;
		private final String receiverUuid;

        -- 친구 초대 --

        private final String receiverUuid;
        private final String notifyType;

     */

    @Builder
    @AllArgsConstructor
    public static class Request{
        private final String receiverUuid;
        private final String roomUuid;
        private final String notifyType;

    }

    @Getter
    @Builder
    public static class FriendResponse {
        String id;
        String senderUuid;
        String nickname;
        String content;
        String type;
        String profileUrl;
        char isRead;
        LocalDateTime createdAt;

        public static NotifyDto.FriendResponse from(Notify notify){
            return FriendResponse.builder()
                    .id(notify.getId().toString())
                    .senderUuid(notify.getSenderUuid())
                    .content(notify.getContent())
                    .nickname(notify.getNickname())
                    .profileUrl(notify.getProfileUrl())
                    .type(notify.getNotificationType().name())
                    .isRead(notify.getIsRead())
                    .createdAt(notify.getCreatedAt())
                    .build();
        }
    }

    @Getter
    @Builder
    public static class GameResponse {
        String id;
        String roomUuid;
        String nickname;
        String content;
        String type;
        String profileUrl;
        char isRead;
        LocalDateTime createdAt;

        public static NotifyDto.GameResponse from(Notify notify){
            return GameResponse.builder()
                    .id(notify.getId().toString())
                    .content(notify.getContent())
                    .nickname(notify.getNickname())
                    .roomUuid(notify.getRoomUuid())
                    .type(notify.getNotificationType().name())
                    .isRead(notify.getIsRead())
                    .profileUrl(notify.getProfileUrl())
                    .createdAt(notify.getCreatedAt())
                    .build();
        }
    }
}

