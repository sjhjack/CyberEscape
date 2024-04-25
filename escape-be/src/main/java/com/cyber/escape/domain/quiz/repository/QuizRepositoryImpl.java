//package com.cyber.escape.domain.quiz.repository;
//
//import com.cyber.escape.domain.quiz.entity.QQuiz;
//import com.cyber.escape.domain.quiz.entity.Quiz;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import jakarta.persistence.EntityManager;
//
//import java.util.List;
//import java.util.Optional;
//
//public class QuizRepositoryImpl implements QuizRepository {
//
//    private JPAQueryFactory jpaQueryFactory;
//    private EntityManager entityManager;
//
//    public QuizRepositoryImpl(JPAQueryFactory jpaQueryFactory, EntityManager entityManager){
//        this.jpaQueryFactory = jpaQueryFactory;
//        this.entityManager = entityManager;
//    }
//
//    @Override
//    public Optional<List<Quiz>> findByThemaUuid(String themaUuid) {
//
//        QQuiz quiz = QQuiz.quiz;
//
//        jpaQueryFactory
//                .selectFrom(quiz)
//                .where(quiz.difficulty.eq(1))
//
//
//
//
//        return Optional.empty();
//    }
//}
//
//
