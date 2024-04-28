package com.cyber.escape.domain.chat.entity;


import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;


@Getter
@ToString
@Entity
@Table(name="participants")
public class Participants extends BaseEntity {

    @ManyToOne
    @JoinColumn(name="chat_room_id", referencedColumnName = "id")
    private ChatRoom chatRoom;
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User participant;
    @ManyToOne
    @JoinColumn(name="updated_user", referencedColumnName = "id")
    private User updatedUser;


    public Participants(){

    }

    @Builder
    public Participants(ChatRoom chatRoom, User participant, User updatedUser) {
        this.chatRoom = chatRoom;
        this.participant = participant;
        this.updatedUser = updatedUser;
    }

}
