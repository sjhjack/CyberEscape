DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
                        `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `title`	varchar(255)	NOT NULL,
                        `password`	varchar(512)	NULL,
                        `capacity`	int	NOT NULL	DEFAULT 0,
                        `started_at`	timestamp	NULL	DEFAULT current_timestamp,
                        `thema_id`	Bigint	NOT NULL,
                        `user_id`	Bigint	NOT NULL,
                        `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `uuid`	varchar(255)	NOT NULL,
                        `created_user`	Bigint	NOT NULL,
                        `updated_user`	Bigint	NOT NULL
);

DROP TABLE IF EXISTS `thema`;

CREATE TABLE `thema` (
                         `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `category`	int	NULL	DEFAULT 0	COMMENT '테마 카테고리',
                         `description`	varchar(255)	NULL	COMMENT '테마 설명',
                         `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                         `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                         `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `furniture`;

CREATE TABLE `furniture` (
                             `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                             `url`	varchar(255)	NULL,
                             `name`	varchar(255)	NULL,
                             `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                             `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                             `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
                        `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `login_id`	varchar(255)	NOT NULL,
                        `password`	varchar(512)	NOT NULL,
                        `nickname`	varchar(255)	NOT NULL,
                        `point`	int	NULL	DEFAULT 0,
                        `character_id`	Bigint	NOT NULL,
                        `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `uuid`	varchar(255)	NOT NULL,
                        `withdrawal`	tinyint	NOT NULL	DEFAULT 0
);

DROP TABLE IF EXISTS `game_history`;

CREATE TABLE `game_history` (
                                `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `user_id`	Bigint	NOT NULL	COMMENT '유저 아이디',
                                `thema_id`	Bigint	NOT NULL	COMMENT '테마 아이디',
                                `clear_time`	timestamp	NOT NULL	DEFAULT current_timestamp	COMMENT '게임 클리어 시간',
                                `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `friend`;

CREATE TABLE `friend` (
                          `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `from_user_id`	Bigint	NOT NULL,
                          `to_user_id`	Bigint	NOT NULL,
                          `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                          `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                          `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `quiz`;

CREATE TABLE `quiz` (
                        `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `hint`	varchar(255)	NULL	COMMENT '힌트',
                        `content`	varchar(255)	NULL	COMMENT '퀴즈 내용',
                        `url`	varchar(255)	NULL	COMMENT '퀴즈 이미지',
                        `difficulty`	int	NULL	DEFAULT 0	COMMENT '난이도',
                        `answer`	varchar(255)	NOT NULL	COMMENT '정답',
                        `type`	varchar(255)	NULL	COMMENT '문제 타입',
                        `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `uuid`	varchar(255)	NOT NULL,
                        `thema_id`	Bigint	NOT NULL
);

DROP TABLE IF EXISTS `final_answer`;

CREATE TABLE `final_answer` (
                                `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `answer`	varchar(255)	NOT NULL	COMMENT '최종 정답 내용',
                                `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `ranking`;

CREATE TABLE `ranking` (
                           `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `best_time`	timestamp	NOT NULL	DEFAULT current_timestamp,
                           `thema_id`	Bigint	NOT NULL,
                           `user_id`	Bigint	NOT NULL,
                           `ranking_id`	Bigint	NOT NULL,
                           `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                           `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                           `uuid`	varchar(255)	NULL
);

DROP TABLE IF EXISTS `my_character`;

CREATE TABLE `my_character` (
                                `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `user_id`	Bigint	NOT NULL,
                                `character_id`	Bigint	NOT NULL,
                                `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `character_store`;

CREATE TABLE `character_store` (
                                   `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                   `character_name`	varchar(255)	NOT NULL,
                                   `price`	int	NOT NULL,
                                   `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                   `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                   `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `chat_room`;

CREATE TABLE `chat_room` (
                             `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                             `title`	varchar(255)	NOT NULL,
                             `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                             `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                             `created_user`	Bigint	NOT NULL,
                             `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `friend_delete_history`;

CREATE TABLE `friend_delete_history` (
                                         `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                         `from_user_id`	Bigint	NOT NULL,
                                         `to_user_id`	Bigint	NOT NULL,
                                         `created_at`	timestamp	NULL	DEFAULT current_timestamp,
                                         `updated_at`	timestamp	NULL	DEFAULT current_timestamp,
                                         `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `participants`;

CREATE TABLE `participants` (
                                `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `chat_room_id`	Bigint	NOT NULL,
                                `user_id`	Bigint	NOT NULL,
                                `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `updated_user`	Bigint	NOT NULL,
                                `uuid`	varchar(255)	NULL
);

DROP TABLE IF EXISTS `chat_message`;

CREATE TABLE `chat_message` (
                                `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `chat_room_id`	Bigint	NOT NULL,
                                `sender_id`	Bigint	NOT NULL,
                                `content`	varchar(255)	NULL,
                                `type`	char(5)	NOT NULL,
                                `created_at`	timestamp	NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NULL	DEFAULT current_timestamp,
                                `uuid`	varchar(255)	NULL
);

DROP TABLE IF EXISTS `chat_of_room`;

CREATE TABLE `chat_of_room` (
                                `id`	Bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `room_id`	Bigint	NOT NULL,
                                `chat_room_id`	Bigint	NOT NULL,
                                `created_at`	timestamp	NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NULL	DEFAULT current_timestamp
);

ALTER TABLE `room` ADD CONSTRAINT `FK_thema_TO_room_1` FOREIGN KEY (
                                                                    `thema_id`
    )
    REFERENCES `thema` (
                        `id`
        );

ALTER TABLE `room` ADD CONSTRAINT `FK_user_TO_room_1` FOREIGN KEY (
                                                                   `user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `game_history` ADD CONSTRAINT `FK_user_TO_game_history_1` FOREIGN KEY (
                                                                                   `user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `game_history` ADD CONSTRAINT `FK_thema_TO_game_history_1` FOREIGN KEY (
                                                                                    `thema_id`
    )
    REFERENCES `thema` (
                        `id`
        );

ALTER TABLE `friend` ADD CONSTRAINT `FK_user_TO_friend_1` FOREIGN KEY (
                                                                       `from_user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `friend` ADD CONSTRAINT `FK_user_TO_friend_2` FOREIGN KEY (
                                                                       `to_user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `quiz` ADD CONSTRAINT `FK_thema_TO_quiz_1` FOREIGN KEY (
                                                                    `thema_id`
    )
    REFERENCES `thema` (
                        `id`
        );

ALTER TABLE `ranking` ADD CONSTRAINT `FK_thema_TO_ranking_1` FOREIGN KEY (
                                                                          `thema_id`
    )
    REFERENCES `thema` (
                        `id`
        );

ALTER TABLE `ranking` ADD CONSTRAINT `FK_user_TO_ranking_1` FOREIGN KEY (
                                                                         `user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `ranking` ADD CONSTRAINT `FK_game_history_TO_ranking_1` FOREIGN KEY (
                                                                                 `ranking_id`
    )
    REFERENCES `game_history` (
                               `id`
        );

ALTER TABLE `my_character` ADD CONSTRAINT `FK_user_TO_my_character_1` FOREIGN KEY (
                                                                                   `user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `my_character` ADD CONSTRAINT `FK_character_store_TO_my_character_1` FOREIGN KEY (
                                                                                              `character_id`
    )
    REFERENCES `character_store` (
                                  `id`
        );

ALTER TABLE `friend_delete_history` ADD CONSTRAINT `FK_user_TO_friend_delete_history_1` FOREIGN KEY (
                                                                                                     `from_user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `friend_delete_history` ADD CONSTRAINT `FK_user_TO_friend_delete_history_2` FOREIGN KEY (
                                                                                                     `to_user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `participants` ADD CONSTRAINT `FK_chat_room_TO_participants_1` FOREIGN KEY (
                                                                                        `chat_room_id`
    )
    REFERENCES `chat_room` (
                            `id`
        );

ALTER TABLE `participants` ADD CONSTRAINT `FK_user_TO_participants_1` FOREIGN KEY (
                                                                                   `user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `participants` ADD CONSTRAINT `FK_user_TO_participants_2` FOREIGN KEY (
                                                                                   `updated_user`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_chat_room_TO_chat_message_1` FOREIGN KEY (
                                                                                        `chat_room_id`
    )
    REFERENCES `chat_room` (
                            `id`
        );

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_user_TO_chat_message_1` FOREIGN KEY (
                                                                                   `sender_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `chat_of_room` ADD CONSTRAINT `FK_room_TO_chat_of_room_1` FOREIGN KEY (
                                                                                   `room_id`
    )
    REFERENCES `room` (
                       `id`
        );

ALTER TABLE `chat_of_room` ADD CONSTRAINT `FK_chat_room_TO_chat_of_room_1` FOREIGN KEY (
                                                                                        `chat_room_id`
    )
    REFERENCES `chat_room` (
                            `id`
        );

