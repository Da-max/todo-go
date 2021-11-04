CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    username CHAR(55) UNIQUE NOT NULL,
    email CHAR(255) UNIQUE NOT NULL,
    password CHAR(255) NOT NULL,
    is_active BOOLEAN,
    is_admin BOOLEAN
);