ALTER TABLE user ADD COLUMN character_id bigint NOT NULL;
ALTER TABLE user DROP COLUMN character_id;