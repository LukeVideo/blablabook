-- Création des tables de la base de données

BEGIN;

-- On supprime les tables si elles existent avant de les recréer
DROP TABLE IF EXISTS book, reader, reader_role, author, category, bookshelf, book_in_bookshelf, book_has_review, book_status;
DROP DOMAIN IF EXISTS email_type, note_type CASCADE;
-- Création de domaine  pour intégrer une expression régulière utile pour vérifier la validité des adresses email
CREATE DOMAIN email_type AS TEXT
  CHECK ( VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Création d'un domaine pour gérer la notation entre 0 et 5
CREATE DOMAIN note_type AS INTEGER
CHECK ( VALUE >= 0 AND VALUE <= 5 );

-- On crée les tables

CREATE TABLE reader_role (
  id SERIAL PRIMARY KEY,
  role_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE author(
  id SERIAL PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  biography TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE book_status(
  id SERIAL PRIMARY KEY,
  book_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE category(
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);


CREATE TABLE book(
  id SERIAL PRIMARY KEY,
  isbn TEXT NOT NULL,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES author(id),
  book_cover TEXT NOT NULL, 
  category_id INTEGER NOT NULL REFERENCES category(id),
  release_date TIMESTAMPTZ NOT NULL,
  book_description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TABLE reader(
  id SERIAL PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  nickname TEXT NOT NULL UNIQUE,
  email email_type NOT NULL UNIQUE,
  reader_password TEXT NOT NULL,
  reader_role_id INTEGER NOT NULL REFERENCES reader_role(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bookshelf(
  id SERIAL PRIMARY KEY,
  reader_id INTEGER NOT NULL REFERENCES reader(id) ON DELETE CASCADE,
  bookshelf_name TEXT NOT NULL DEFAULT 'MyBookshelf',
  bookshelf_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION create_default_bookshelf()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO bookshelf (reader_id, bookshelf_name, bookshelf_description, created_at, updated_at) 
  VALUES (NEW.id, 'MyBookshelf',  'Ma bibliothèque personnelle', NOW(), NOW());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_reader_insert
AFTER INSERT  ON reader
FOR EACH ROW
EXECUTE FUNCTION create_default_bookshelf();


CREATE TABLE book_in_bookshelf(
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES book(id),
  bookshelf_id INTEGER NOT NULL REFERENCES bookshelf(id),
  book_status_id INTEGER NOT NULL REFERENCES book_status(id),
  display BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE book_has_review(
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES book(id),
  reader_id INTEGER NOT NULL REFERENCES reader(id),
  note note_type,
  review TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Insertion de données de base dans les tables
-- Données "obligatoires" pour category, book_status et reader_role
INSERT INTO category (label) VALUES 
('Action'),
('Aventure'),
('Comédie'),
('Documentaire'),
('Drame'),
('Fantastique'),
('Historique'),
('Horreur'),
('Jeunesse'),
('Philosophie'),
('Polar'),
('Religion'),
('Romance'),
('Science-Fiction'),
('Thriller');

INSERT INTO book_status (book_status) VALUES 
('à lire'),
('à acheter'),
('lu'),
('en cours');

INSERT INTO reader_role (role_name) VALUES
('admin'),
('reader');

-- Données de test pour les tables book et author
INSERT INTO author (firstname, lastname, biography, created_at, updated_at) VALUES 
('John Ronald Reuel', 'Tolkien','J.R.R. Tolkien (1892-1973) était un écrivain, philologue et professeur britannique, célèbre pour avoir écrit "Le Seigneur des Anneaux" et "Le Hobbit". Son œuvre a profondément influencé la fantasy moderne.', NOW(), NOW()),
('Jules', 'Verne', 'Jules Verne (1828-1905) était un écrivain français pionnier de la science-fiction, connu pour ses romans d’aventure et d’anticipation.', NOW(), NOW()),
('Victor', 'Hugo', 'Victor Hugo (1802-1885) était un écrivain et poète français majeur du XIXe siècle, connu pour "Les Misérables" et "Notre-Dame de Paris".', NOW(), NOW()),
('Gaston', 'Leroux', 'Gaston Leroux (1868-1927) était un écrivain et journaliste français, célèbre pour "Le Fantôme de l’Opéra" et ses romans policiers.', NOW(), NOW()),
('Simone', 'de Beauvoir', 'Simone de Beauvoir (1908-1986) était une philosophe et écrivaine française, figure majeure du féminisme et de l’existentialisme.', NOW(), NOW()),
('Albert', 'Camus', 'Albert Camus (1913-1960) était un écrivain et philosophe français, connu pour ses réflexions sur l’absurde et la révolte.', NOW(), NOW()),
('Amélie', 'Nothomb', 'Amélie Nothomb est une écrivaine belge contemporaine, célèbre pour son style unique et ses romans courts et incisifs.', NOW(), NOW()),
('Maurice', 'Leblanc', 'Maurice Leblanc (1864-1941) était un écrivain français, créateur du personnage emblématique d’Arsène Lupin.', NOW(), NOW()),
('Michel', 'Onfray', 'Michel Onfray est un philosophe français contemporain, connu pour ses ouvrages sur l’athéisme et la pensée critique.', NOW(), NOW()),
('Bernard', 'Werber', 'Bernard Werber est un écrivain français de science-fiction, connu pour sa trilogie des "Fourmis".', NOW(), NOW());

INSERT INTO book (isbn, title, author_id, category_id, release_date, book_description, book_cover) VALUES 
('9780261102385', 'Le Seigneur des Anneaux', 1, 1, '1954-07-29 00:00:00', 'Une quête épique pour détruire un anneau maléfique.','https://content.rozetka.com.ua/goods/images/big/424256502.jpg'),
('9782253006329', 'Vingt mille lieues sous les mers', 2, 2, '1869-06-20 00:00:00', 'Les aventures du capitaine Nemo et du sous-marin Nautilus.', 'https://example.com/verne.jpg'),
('9782070408500', 'Les Misérables', 3, 5, '1862-04-03 00:00:00', 'L’histoire de Jean Valjean et son combat contre l’injustice.', 'https://example.com/hugo.jpg'),
('9782253009450', 'Le Fantôme de l’Opéra', 4, 11, '1910-09-23 00:00:00', 'Un mystérieux fantôme hante l’Opéra de Paris.', 'https://example.com/leroux.jpg'),
('9782070323513', 'Le Deuxième Sexe', 5, 10, '1949-05-01 00:00:00', 'Un essai féministe majeur du XXe siècle.', 'https://example.com/beauvoir.jpg'),
('9782070360020', 'L’Étranger', 6, 14, '1942-06-19 00:00:00', 'Un roman existentialiste sur l’absurdité de la vie.', 'https://example.com/camus.jpg'),
('9782253073498', 'Stupeur et tremblements', 7, 3, '1999-08-20 00:00:00', 'Un roman inspiré par l’expérience japonaise de l’auteure.', 'https://example.com/nothomb.jpg'),
('9782253167611', 'Arsène Lupin, gentleman cambrioleur', 8, 12, '1907-06-10 00:00:00', 'Les aventures du célèbre voleur au grand cœur.', 'https://example.com/leblanc.jpg'),
('9782757877923', 'Traité d’athéologie', 9, 13, '2005-09-01 00:00:00', 'Un essai sur l’athéisme et la critique des religions.', 'https://example.com/onfray.jpg'),
('9782221126380', 'Les Fourmis', 10, 14, '1991-09-01 00:00:00', 'Une épopée fascinante sur le monde des fourmis.', 'https://example.com/werber.jpg');

INSERT INTO reader (firstname, lastname, nickname, email, reader_password, reader_role_id)

-- Insertion des valeurs pour le reader. On utilise une requête SQL directement en tant que VALUES pour trouver l'id  correspondante au rôle de "reader"
VALUES 
('Jean','Bonneau','Jambon','jb@madrange.fr','$argon2id$v=19$m=65536,t=3,p=4$wPuLLCjIYd/UE5R1lYgWRg$ZsPYd+HBV03Zujc/YT0MokGC8BBmRsgShtckPEaY0XY',(SELECT id FROM reader_role WHERE role_name = 'reader')
  ),

('Père','Fusion','Perfusion','pere@mail.com','$argon2id$v=19$m=65536,t=3,p=4$wPuLLCjIYd/UE5R1lYgWRg$ZsPYd+HBV03Zujc/YT0MokGC8BBmRsgShtckPEaY0XY',(SELECT id FROM reader_role WHERE role_name = 'admin')
  );

COMMIT;
