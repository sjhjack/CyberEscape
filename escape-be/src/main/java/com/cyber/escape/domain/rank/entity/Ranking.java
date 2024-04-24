package com.cyber.escape.domain.rank.entity;

import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.domain.user.entity.User;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.sql.Time;
import java.time.LocalTime;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor
@Setter
@AllArgsConstructor
@Builder
@Table(name="ranking")
public class Ranking extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "thema_id", referencedColumnName = "id")
    private Thema thema;

//    @ManyToOne
//    @JoinColumn(name = "ranking_id", referencedColumnName = "id")
//    private  GameHistory gameHistory;

    @Column(name="best_time")
    private LocalTime bestTime;

}
