
ALTER TABLE thema MODIFY description varchar(2500);
ALTER TABLE quiz MODIFY content varchar(5000);
ALTER TABLE chat_message MODIFY content varchar(512);

ALTER TABLE user MODIFY point int NOT NULL DEFAULT 0;
