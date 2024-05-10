package com.cyber.escape.domain.notification.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.cyber.escape.domain.notification.document.Notify;
import lombok.Builder;
import lombok.Getter;

// @Getter
// @Builder
// @AllArgsConstructor
// @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotifyDto {
    // Todo : member의 unique 값을 뭐로 저장하냐에 따라서 id 타입 바꾸기
    // 지금은 Long id를 참조

    public static class FriendNotifyResponse{
        List<Object> friendResponse;
    }
    public static class GameNotifyResponse{
        List<Object> gameResponse;
    }

    @Getter
    @Builder
    public static class FriendResponse {
        String id;
        String senderUuid;
        String nickname;
        String content;
        String type;
        char isRead;
        LocalDateTime createdAt;

        public static NotifyDto.FriendResponse from(Notify notify){
            return FriendResponse.builder()
                    .id(notify.getId().toString())
                    .senderUuid(notify.getSenderUuid())
                    .content(notify.getContent())
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
        String gameUuid;
        String nickname;
        String content;
        String type;
        char isRead;
        LocalDateTime createdAt;

        public static NotifyDto.GameResponse from(Notify notify){
            return GameResponse.builder()
                    .id(notify.getId().toString())
                    .content(notify.getContent())
                    .type(notify.getNotificationType().name())
                    .isRead(notify.getIsRead())
                    .createdAt(notify.getCreatedAt())
                    .build();
        }
    }
}

