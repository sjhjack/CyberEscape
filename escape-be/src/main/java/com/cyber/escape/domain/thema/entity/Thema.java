package com.cyber.escape.domain.thema.entity;


import com.cyber.escape.domain.quiz.entity.Quiz;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
public class Thema extends BaseEntity {
    private int category;
    private String description;

    @OneToMany(mappedBy = "thema")
    private List<Quiz> quiz;
}
