package com.cyber.escape.domain.quiz.entity;


import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;

@Entity
@Getter
public class FinalAnswer extends BaseEntity {
    String answer;
}
