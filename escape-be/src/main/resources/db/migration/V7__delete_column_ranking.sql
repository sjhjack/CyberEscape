-- 외래 키 제약 제거
ALTER TABLE ranking DROP FOREIGN KEY FK_game_history_TO_ranking_1;
-- 다른 외래 키 제약도 필요에 따라 삭제합니다.

-- ranking_id 컬럼 삭제
ALTER TABLE ranking DROP COLUMN ranking_id;