package com.cyber.escape.domain.rank.entity;

import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
@Table(name="ranking")
public class Ranking extends BaseEntity {
//    @ManyToOne
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private  User user;

//    @ManyToOne
//    @JoinColumn(name = "thema_id", referencedColumnName = "id")
//    private  Thema thema;

//    @ManyToOne
//    @JoinColumn(name = "ranking_id", referencedColumnName = "id")
//    private  GameHistory gameHistory;

    @Column(name="best_time")
    private LocalDateTime bestTime;

    private String uuid;

}
