
UPDATE thema
SET category = CASE
                   WHEN category = 0 THEN 1
                   WHEN category = 1 THEN 2
                   WHEN category = 2 THEN 3
                   ELSE category  -- 다른 값들은 변경하지 않고 그대로 유지
    END
WHERE category IN (0, 1, 2);

DELETE FROM thema WHERE category = 4;
DELETE FROM thema WHERE category = 5;
DELETE FROM thema WHERE category = 6;

UPDATE thema SET category = 4 WHERE category = 7;
UPDATE thema SET category = 5 WHERE category = 8;
UPDATE thema SET category = 6 WHERE category = 9;

INSERT INTO thema(category, description) VALUES(7, "눈을 뜨니 우주선이다. 나에게 주어진 시간은 10분, 시간 내에 이 우주선을 탈출해야한다!");

