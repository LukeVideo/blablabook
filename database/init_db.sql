-- Création des tables de la base de données

BEGIN;

-- On supprime les tables si elles existent avant de les recréer
DROP TABLE IF EXISTS book, user, user_role, author, category, bookshelf, book_in_bookshelf, book_has_review, book_status;

-- Création de domaine  pour intégrer une expression régulière utile pour vérifier la validité des adresses email
CREATE DOMAIN email_type AS TEXT
  CHECK ( VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Création d'un domaine pour gérer la notation entre 0 et 5
CREATE DOMAIN note_type AS INTEGER
CHECK ( VALUE >= 0 AND VALUE <= 5 );

-- On crée les tables

CREATE TABLE user_role (
  id SERIAL AS PRIMARY KEY,
  role_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE book_in_bookshelf(
  id SERIAL AS PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES book(id),
  bookshelf_id INTEGER NOT NULL REFERENCES bookshelf(id),
  book_status_id INTEGER NOT NULL REFERENCES book_status(id),
  display BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE book_has_review(
  id SERIAL AS PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES book(id),
  user_id INTEGER NOT NULL REFERENCES user(id),
  note note_type INTEGER NOT NULL,
  review TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE book_status(
  id SERIAL AS PRIMARY KEY,
  book_status TEXT NOT NULL,
);

CREATE category(
  id SERIAL AS PRIMARY KEY,
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE author(
  id SERIAL AS PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  biography TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE book(
  id SERIAL AS PRIMARY KEY,
  isbn TEXT,
  title TEXT,
  author INTEGER REFERENCES author(id),
  category_id TEXT REFERENCES category(id),
  release_date TIMESTAMPTZ NOT NULL,
  book_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TABLE user(
  id SERIAL AS PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email email_type NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  user_role_id INTEGER NOT NULL REFERENCES user_role(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE bookshelf(
  id SERIAL AS PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES user(id),
  bookshelf_name TEXT NOT NULL,
  bookshelf_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Insertion de données de base dans les tables
-- Données "obligatoires" pour category, book_status et user_role
INSERT INTO category (name) VALUES ('Action', 'Aventure', 'Comédie', 'Documentaire', 'Drame', 'Fantastique', 'Historique','Horreur', 'Jeunesse', 'Philosophie', 'Polar', 'Religion', 'Romance', 'Science-Fiction', 'Thriller');

INSERT INTO book_status (book_status) VALUES ('à lire', 'à acheter', 'lu', 'en cours');

INSERT INTO user_role (role_name) VALUES ('admin', 'user');


-- Données de test pour les tables book et author
INSERT INTO book (isbn, title, author, catergory_id, release_date, book_description ) VALUES (9780261102385, 'Le Seigneur des Anneaux','J.R.R. Tolkien', 'Fantasy', '1954-07-29 00:00:00'::timestamp, 'Une quête épique pour détruire un anneau maléfique.')

INSERT INTO author (firstname, lastname, biography, created_at, updated_at)  
VALUES ('John Ronald Reuel', 'Tolkien',  
    'J.R.R. Tolkien (1892-1973) était un écrivain, philologue et professeur britannique, célèbre pour avoir écrit "Le Seigneur des Anneaux" et "Le Hobbit". Son œuvre a profondément influencé la fantasy moderne.',  
    NOW(), NOW());  


COMMIT;