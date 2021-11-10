CREATE TABLE IF NOT EXISTS friend (
  "id" serial NOT NULL,
  "name" character varying(255) NOT NULL,
  "likes_ice_cream" boolean NOT NULL
);

INSERT INTO friend (name, likes_ice_cream)
VALUES
  ('Angelin',true),
  ('Armine',false),
  ('Jimmy',false),
  ('Miika',true),
  ('Konsta',true);