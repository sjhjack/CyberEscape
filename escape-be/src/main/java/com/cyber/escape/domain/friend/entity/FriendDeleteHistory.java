package com.cyber.escape.domain.friend.entity;


import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="friend_delete_history")
public class FriendDeleteHistory extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="from_user_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name="to_user_id")
    private User receiver;
}
