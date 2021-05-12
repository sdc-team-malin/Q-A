\c questions_answers;

DROP TABLE IF EXISTS answers_photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions(
    question_id INT PRIMARY KEY,
    product_id INT,
    q_body VARCHAR(200),
    q_date date DEFAULT CURRENT_DATE,
    asker_name VARCHAR(40),
    asker_email VARCHAR(40),
    q_reported INT DEFAULT 0,
    q_helpful INT DEFAULT 0
);

CREATE TABLE answers (
    answer_id INT PRIMARY KEY,
    question_id INT REFERENCES questions(question_id),
    answer_body VARCHAR(200),
    a_date date DEFAULT CURRENT_DATE,
    answerer_name VARCHAR(40),
    answerer_email VARCHAR(40),
    a_reported INT DEFAULT 0,
    a_helpful INT DEFAULT 0
);

CREATE TABLE answers_photos (
  id INT PRIMARY KEY,
  answer_id INT REFERENCES answers(answer_id),
  photo_url VARCHAR(400)
);

\COPY questions FROM '/Users/ryanpannone/HR/SDC-Q-A/csv-files/questions (1).csv' DELIMITER ',' CSV HEADER;

\COPY answers FROM '/Users/ryanpannone/HR/SDC/RP/csv-files/answers (1).csv' DELIMITER ',' CSV HEADER;

\COPY answers_photos FROM '/Users/ryanpannone/HR/SDC-Q-A/csv-files/answers_photos (1).csv' DELIMITER ',' CSV HEADER;


CREATE SEQUENCE qid START 3521635;


CREATE SEQUENCE aid START 12392947;


CREATE SEQUENCE pid START 3717893;

create index q_table_index on questions(product_id);

create index answers_table_index on answers(question_id);

create index photos_table_index on answers_photos(answer_id);

