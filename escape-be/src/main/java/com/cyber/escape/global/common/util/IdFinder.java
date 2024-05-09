package com.cyber.escape.global.common.util;

import com.cyber.escape.global.exception.EntireException;
import com.cyber.escape.global.exception.ExceptionCodeSet;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import org.springframework.stereotype.Component;

@Component
public class IdFinder {
    private final EntityManager entityManager;
    public IdFinder(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Long findIdByUuid(String uuid, Class<?> entityClass) {

        try {
            Long id = entityManager.createQuery("SELECT e.id FROM " + entityClass.getSimpleName() + " e WHERE e.uuid = :uuid", Long.class)
                    .setParameter("uuid", uuid)
                    .getSingleResult();

            return id;
        }
        catch (NoResultException e){
            // 해당 테이블에 Uuid에 해당하는 id가 없을 때
            throw new EntireException(ExceptionCodeSet.ENTITY_NOT_EXISTS);
        }
    }
}