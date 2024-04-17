DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
                        `id`	Bigint	NOT NULL,
                        `title`	varchar(255)	NOT NULL,
                        `password`	varchar(255)	NULL,
                        `capacity`	int	NOT NULL	DEFAULT 0,
                        `startedAt`	timestamp	NULL	DEFAULT current_timestamp,
                        `thema_id`	Bigint	NOT NULL,
                        `user_id`	Bigint	NOT NULL,
                        `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `thema`;

CREATE TABLE `thema` (
                         `id`	Bigint	NOT NULL,
                         `category`	int	NULL	DEFAULT 0	COMMENT '테마 카테고리',
                         `description`	varchar(255)	NULL	COMMENT '테마 설명',
                         `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                         `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                         `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `furniture`;

CREATE TABLE `furniture` (
                             `id`	Bigint	NOT NULL,
                             `url`	varchar(255)	NULL,
                             `name`	varchar(255)	NULL,
                             `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                             `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                             `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
                        `id`	Bigint	NOT NULL,
                        `login_id`	varchar(255)	NOT NULL,
                        `password`	varchar(255)	NOT NULL,
                        `nickname`	varchar(255)	NOT NULL,
                        `point`	int	NULL	DEFAULT 0,
                        `character_id`	Bigint	NOT NULL,
                        `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `ranking`;

CREATE TABLE `ranking` (
                           `id`	Bigint	NOT NULL,
                           `user_id`	Bigint	NOT NULL	COMMENT '유저 아이디',
                           `thema_id`	Bigint	NOT NULL	COMMENT '테마 아이디',
                           `clear_time`	timestamp	NOT NULL	DEFAULT current_timestamp	COMMENT '게임 클리어 시간',
                           `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                           `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                           `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `friend`;

CREATE TABLE `friend` (
                          `id`	Bigint	NOT NULL,
                          `from_user_id`	Bigint	NOT NULL,
                          `to_user_id`	Bigint	NOT NULL,
                          `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                          `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                          `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `quiz`;

CREATE TABLE `quiz` (
                        `id`	Bigint	NOT NULL,
                        `hint`	varchar(255)	NULL	COMMENT '힌트',
                        `content`	varchar(255)	NULL	COMMENT '퀴즈 내용',
                        `url`	varchar(255)	NULL	COMMENT '퀴즈 이미지',
                        `difficulty`	int	NULL	DEFAULT 0	COMMENT '난이도',
                        `answer`	varchar(255)	NOT NULL	COMMENT '정답',
                        `type`	varchar(255)	NULL	COMMENT '문제 타입',
                        `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                        `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `final_answer`;

CREATE TABLE `final_answer` (
                                `id`	Bigint	NOT NULL,
                                `answer`	varchar(255)	NOT NULL	COMMENT '최종 정답 내용',
                                `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `best_score`;

CREATE TABLE `best_score` (
                              `id`	Bigint	NOT NULL,
                              `best_time`	timestamp	NOT NULL	DEFAULT current_timestamp,
                              `thema_id`	Bigint	NOT NULL,
                              `user_id`	Bigint	NOT NULL,
                              `ranking_id`	Bigint	NOT NULL,
                              `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                              `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                              `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `my_character`;

CREATE TABLE `my_character` (
                                `id`	Bigint	NOT NULL,
                                `user_id`	Bigint	NOT NULL,
                                `character_id`	Bigint	NOT NULL,
                                `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                `uuid`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `character_store`;

CREATE TABLE `character_store` (
                                   `id`	Bigint	NOT NULL,
                                   `character_name`	varchar(255)	NOT NULL,
                                   `price`	int	NOT NULL,
                                   `created_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                   `updated_at`	timestamp	NOT NULL	DEFAULT current_timestamp,
                                   `uuid`	varchar(255)	NOT NULL
);

ALTER TABLE `room` ADD CONSTRAINT `PK_ROOM` PRIMARY KEY (
                                                         `id`
    );

ALTER TABLE `thema` ADD CONSTRAINT `PK_THEMA` PRIMARY KEY (
                                                           `id`
    );

ALTER TABLE `furniture` ADD CONSTRAINT `PK_FURNITURE` PRIMARY KEY (
                                                                   `id`
    );

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
                                                         `id`
    );

ALTER TABLE `ranking` ADD CONSTRAINT `PK_RANKING` PRIMARY KEY (
                                                               `id`
    );

ALTER TABLE `friend` ADD CONSTRAINT `PK_FRIEND` PRIMARY KEY (
                                                             `id`
    );

ALTER TABLE `quiz` ADD CONSTRAINT `PK_QUIZ` PRIMARY KEY (
                                                         `id`
    );

ALTER TABLE `final_answer` ADD CONSTRAINT `PK_FINAL_ANSWER` PRIMARY KEY (
                                                                         `id`
    );

ALTER TABLE `best_score` ADD CONSTRAINT `PK_BEST_SCORE` PRIMARY KEY (
                                                                     `id`
    );

ALTER TABLE `my_character` ADD CONSTRAINT `PK_MY_CHARACTER` PRIMARY KEY (
                                                                         `id`
    );

ALTER TABLE `character_store` ADD CONSTRAINT `PK_CHARACTER_STORE` PRIMARY KEY (
                                                                               `id`
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

ALTER TABLE `ranking` ADD CONSTRAINT `FK_user_TO_ranking_1` FOREIGN KEY (
                                                                         `user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `ranking` ADD CONSTRAINT `FK_thema_TO_ranking_1` FOREIGN KEY (
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

ALTER TABLE `best_score` ADD CONSTRAINT `FK_thema_TO_best_score_1` FOREIGN KEY (
                                                                                `thema_id`
    )
    REFERENCES `thema` (
                        `id`
        );

ALTER TABLE `best_score` ADD CONSTRAINT `FK_user_TO_best_score_1` FOREIGN KEY (
                                                                               `user_id`
    )
    REFERENCES `user` (
                       `id`
        );

ALTER TABLE `best_score` ADD CONSTRAINT `FK_ranking_TO_best_score_1` FOREIGN KEY (
                                                                                  `ranking_id`
    )
    REFERENCES `ranking` (
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

ALTER TABLE `room` ADD CONSTRAINT `UK_ROOM_UUID` UNIQUE (`uuid`);
ALTER TABLE `thema` ADD CONSTRAINT `UK_THEMA_UUID` UNIQUE (`uuid`);
ALTER TABLE `furniture` ADD CONSTRAINT `UK_FURNITURE_UUID` UNIQUE (`uuid`);
ALTER TABLE `user` ADD CONSTRAINT `UK_USER_UUID` UNIQUE (`uuid`);
ALTER TABLE `ranking` ADD CONSTRAINT `UK_RANKING_UUID` UNIQUE (`uuid`);
ALTER TABLE `quiz` ADD CONSTRAINT `UK_QUIZ_UUID` UNIQUE (`uuid`);
ALTER TABLE `final_answer` ADD CONSTRAINT `UK_FINAL_ANSWER_UUID` UNIQUE (`uuid`);
ALTER TABLE `my_character` ADD CONSTRAINT `UK_MY_CHARACTER_UUID` UNIQUE (`uuid`);
ALTER TABLE `character_store` ADD CONSTRAINT `UK_CHARACTER_STORE_UUID` UNIQUE (`uuid`);
