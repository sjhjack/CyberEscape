package com.cyber.escape.domain.furniture.entity;

import com.cyber.escape.domain.thema.entity.Thema;
import com.cyber.escape.global.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name="furniture")
public class Furniture extends BaseEntity {

    private String name;

    @Column(name="asset_url")
    private String assetUrl;

    @ManyToOne
    @JoinColumn(name="thema_id")
    private Thema thema;
}
