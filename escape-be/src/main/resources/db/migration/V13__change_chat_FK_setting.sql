
ALTER TABLE `chat_message` DROP FOREIGN KEY `FK_chat_room_TO_chat_message_1`;
-- 새로운 외래 키 제약 조건 추가
ALTER TABLE `chat_message` ADD CONSTRAINT `FK_chat_room_TO_chat_message` FOREIGN KEY (`chat_room_id`)
    REFERENCES `chat_room` (`id`) ON DELETE CASCADE;


ALTER TABLE `participants` DROP FOREIGN KEY `FK_chat_room_TO_participants_1`;
-- 새로운 외래 키 제약 조건 추가
ALTER TABLE `participants` ADD CONSTRAINT `FK_chat_room_TO_participants` FOREIGN KEY (`chat_room_id`)
    REFERENCES `chat_room` (`id`) ON DELETE CASCADE;

