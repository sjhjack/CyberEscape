
ALTER TABLE thema MODIFY description varchar(2500);
ALTER TABLE quiz MODIFY content varchar(5000);
ALTER TABLE chat_message MODIFY content varchar(512);

ALTER TABLE user MODIFY point int NOT NULL DEFAULT 0;

ALTER TABLE chat_of_room ADD COLUMN uuid VARCHAR(36) NOT NULL;

ALTER TABLE quiz MODIFY difficulty int NOT NULL DEFAULT 0;
ALTER TABLE thema MODIFY category int NOT NULL DEFAULT 0;

# uuid 타입 변경
ALTER TABLE user MODIFY uuid varchar(36);
ALTER TABLE room MODIFY uuid varchar(36);
ALTER TABLE thema MODIFY uuid varchar(36);
ALTER TABLE furniture MODIFY uuid varchar(36);
ALTER TABLE game_history MODIFY uuid varchar(36);
ALTER TABLE friend MODIFY uuid varchar(36);
ALTER TABLE quiz MODIFY uuid varchar(36);
ALTER TABLE final_answer MODIFY uuid varchar(36);
ALTER TABLE ranking MODIFY uuid varchar(36);
ALTER TABLE my_character MODIFY uuid varchar(36);
ALTER TABLE character_store MODIFY uuid varchar(36);
ALTER TABLE chat_room MODIFY uuid varchar(36);
ALTER TABLE friend_delete_history MODIFY uuid varchar(36);
ALTER TABLE participants MODIFY uuid varchar(36);
ALTER TABLE chat_message MODIFY uuid varchar(36);

# uuid set default 변경
ALTER TABLE user ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE room ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE thema ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE furniture ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE game_history ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE friend ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE quiz ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE final_answer ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE ranking ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE my_character ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE character_store ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE chat_room ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE friend_delete_history ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE participants ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE chat_message ALTER COLUMN uuid SET DEFAULT (UUID());
ALTER TABLE chat_of_room ALTER COLUMN uuid SET DEFAULT (UUID());
