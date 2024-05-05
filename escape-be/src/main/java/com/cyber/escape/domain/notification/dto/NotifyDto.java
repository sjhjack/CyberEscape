package com.cyber.escape.domain.notification.dto;

import java.time.LocalDateTime;

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

    @Getter
    @Builder
    public static class Response {
        String id;
        String senderUuid;
        String receiverUuid;
        String content;
        String type;
        char isRead;
        LocalDateTime createdAt;

        public static NotifyDto.Response from(Notify notify){
            return Response.builder()
                    .id(notify.getId().toString())
                    .senderUuid(notify.getSenderUuid())
                    .receiverUuid(notify.getReceiverUuid())
                    .content(notify.getContent())
                    .type(notify.getNotificationType().name())
                    .isRead(notify.getIsRead())
                    .createdAt(notify.getCreatedAt())
                    .build();
        }
    }
}

