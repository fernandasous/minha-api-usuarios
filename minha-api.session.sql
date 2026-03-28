CREATE DATABASE minhaapi;
SHOW DATABASES;

USE minhaapi;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL
);
INSERT INTO users (`id`, `nome`, `idade`) VALUES (NULL, 'João', 25);
INSERT INTO users (`id`, `nome`, `idade`) VALUES (NULL, 'Maria', 30);
INSERT INTO users (`id`, `nome`, `idade`) VALUES (NULL, 'Pedro', 22);
SELECT * FROM users;

