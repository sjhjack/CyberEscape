package com.cyber.escape.domain.chat.entity;


import com.cyber.escape.domain.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="chat_message")
public class ChatMessage {

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
