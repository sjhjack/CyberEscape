package com.cyber.escape.domain.notification.document;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Document
@Getter
@Builder
public class Notify {
    @Id
    private ObjectId id;
    private String senderUuid;
    private String receiverUuid;
    private String nickname; // 친구 요청의 경우 받는 사람의 nickname, 게임 요청의 경우 보내는 사람의 nickname
    private String roomUuid;
    private String content;
    private String profileUrl;
    private NotificationType notificationType;
    private char isRead;
    @CreatedDate
    private LocalDateTime createdAt;

    public enum NotificationType {
        GAME, FRIEND, CHAT
    }
}

