CREATE TABLE revenues (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    description VARCHAR(255) NOT NULL,

    amount DECIMAL(12,2) NOT NULL,

    revenue_date DATE NOT NULL,

    category VARCHAR(100) NOT NULL,

    condominium_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_revenue_condominium
        FOREIGN KEY (condominium_id)
        REFERENCES condominiums(id)
);