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
  book_status TEXT NOT NULL
);

CREATE TABLE category(
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
  reader_id INTEGER NOT NULL REFERENCES reader(id),
  bookshelf_name TEXT NOT NULL,
  bookshelf_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
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
INSERT INTO author (firstname, lastname, biography, created_at, updated_at)  
VALUES ('John Ronald Reuel', 'Tolkien',  
    'J.R.R. Tolkien (1892-1973) était un écrivain, philologue et professeur britannique, célèbre pour avoir écrit "Le Seigneur des Anneaux" et "Le Hobbit". Son œuvre a profondément influencé la fantasy moderne.',  
    NOW(), NOW()); 
 
INSERT INTO book (isbn, title, author_id, category_id, release_date, book_description, book_cover)
VALUES ('9780261102385', 'Le Seigneur des Anneaux', 1, 1, '1954-07-29 00:00:00', 'Une quête épique pour détruire un anneau maléfique.','https://content.rozetka.com.ua/goods/images/big/424256502.jpg');

INSERT INTO reader (firstname, lastname, nickname, email, reader_password, reader_role_id)

-- Insertion des valeurs pour le reader. On utilise une requête SQL directement en tant que VALUES pour trouver l'id  correspondante au rôle de "reader"
VALUES (
'Jean',
 'Bonneau',
 'Jambon',
 'jb@madrange.fr',
 '$argon2id$v=19$m=65536,t=3,p=4$wPuLLCjIYd/UE5R1lYgWRg$ZsPYd+HBV03Zujc/YT0MokGC8BBmRsgShtckPEaY0XY',
  (SELECT id FROM reader_role WHERE role_name = 'reader')
  );




COMMIT;
