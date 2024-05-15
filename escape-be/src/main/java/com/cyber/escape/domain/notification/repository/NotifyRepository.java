package com.cyber.escape.domain.notification.repository;


import java.util.List;
import java.util.Optional;

import com.cyber.escape.domain.notification.document.Notify;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotifyRepository extends MongoRepository<Notify, String> {

    List<Notify> findByReceiverUuidAndIsRead(String receiverUuid, char isRead);
    List<Notify> findBySenderUuidAndReceiverUuidAndNotificationTypeAndIsRead(String senderUuid, String receiverUuid, Notify.NotificationType notificationType, char isRead);
    Optional<Notify> findById(ObjectId id);
}

