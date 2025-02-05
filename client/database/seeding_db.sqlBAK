BEGIN;

INSERT INTO category (name) VALUES ('Action', 'Inconnue', 'Aventure', 'Comédie', 'Documentaire', 'Drame', 'Fantastique', 'Historique','Horreur', 'Jeunesse', 'Philosophie', 'Polar', 'Religion', 'Romance', 'Science-Fiction', 'Thriller');

INSERT INTO book_status (book_status) VALUES ('à lire', 'à acheter', 'lu', 'en cours');

INSERT INTO user_role (role_name) VALUES ('admin', 'user');

INSERT INTO book (isbn, title, author, catergory_id, release_date, book_description ) VALUES (9780261102385, 'Le Seigneur des Anneaux','J.R.R. Tolkien', 'Fantasy', '1954-07-29 00:00:00'::timestamp, 'Une quête épique pour détruire un anneau maléfique.')

INSERT INTO author (firstname, lastname, biography, created_at, updated_at)  
VALUES ('John Ronald Reuel', 'Tolkien',  
    'J.R.R. Tolkien (1892-1973) était un écrivain, philologue et professeur britannique, célèbre pour avoir écrit "Le Seigneur des Anneaux" et "Le Hobbit". Son œuvre a profondément influencé la fantasy moderne.',  
    NOW(), NOW());  


COMMIT;