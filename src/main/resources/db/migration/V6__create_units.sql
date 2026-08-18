CREATE TABLE units (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    number VARCHAR(20) NOT NULL,

    floor INT,

    type VARCHAR(50) NOT NULL,

    status VARCHAR(50) NOT NULL,

    block_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_unit_block
        FOREIGN KEY (block_id)
        REFERENCES blocks(id)
);