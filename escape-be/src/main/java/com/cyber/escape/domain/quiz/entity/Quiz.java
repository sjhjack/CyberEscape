package com.cyber.escape.domain.quiz.entity;

import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
@Builder
public class Quiz extends BaseEntity {

    private String content;
    private String hint;
    private String answer;
    private String url;

    private int difficulty;

    @ManyToOne
    @JoinColumn(name="thema_id")
    private Thema thema;
}
