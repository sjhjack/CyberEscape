package com.cyber.escape.domain.chat.entity;


import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@ToString
@Table(name="chat_room")
public class ChatRoom extends BaseEntity {

    private final String title;

    @ManyToOne
    @JoinColumn(name="created_user", referencedColumnName = "id")
    private final User user;

}
