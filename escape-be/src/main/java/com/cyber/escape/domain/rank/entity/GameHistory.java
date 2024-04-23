package com.cyber.escape.domain.rank.entity;

import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor
@Setter
@AllArgsConstructor
@Builder
@Table(name="game_history")
public class GameHistory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "thema_id", referencedColumnName = "id")
    private Thema thema;

    @Column(name="clear_time")
    private LocalDateTime clearTime;
}
