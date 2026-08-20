CREATE TABLE residents (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    cpf VARCHAR(14) NOT NULL UNIQUE,

    phone VARCHAR(30),

    birth_date DATE,

    user_id BIGINT NOT NULL UNIQUE,

    unit_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_resident_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_resident_unit
        FOREIGN KEY (unit_id)
        REFERENCES units(id)
);