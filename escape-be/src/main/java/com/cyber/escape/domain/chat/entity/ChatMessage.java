package com.cyber.escape.domain.chat.entity;


import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;

@Entity
@Builder
@Table(name="chat_message")
public class ChatMessage extends BaseEntity {

    @ManyToOne
    @JoinColumn(name="chat_room_id", referencedColumnName = "id")
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name="sender_id", referencedColumnName = "id")
    private User sender;

    private String content;

    // 메시지 타입 (ENTER, TALK, EXIT)
    private String type;

}
