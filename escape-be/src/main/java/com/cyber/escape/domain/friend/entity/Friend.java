package com.cyber.escape.domain.friend.entity;

import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalTime;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor
@Setter
@AllArgsConstructor
@Builder
@Table(name="friend")
public class Friend extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "from_user_id", referencedColumnName = "id")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id", referencedColumnName = "id")
    private User toUser;
}
