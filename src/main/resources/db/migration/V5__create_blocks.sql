CREATE TABLE blocks (


    id BIGINT PRIMARY KEY AUTO_INCREMENT,


    name VARCHAR(100) NOT NULL,


    condominium_id BIGINT NOT NULL,


    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_block_condominium
        FOREIGN KEY (condominium_id)
        REFERENCES condominiums(id)
);