CREATE TABLE charges (

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    description VARCHAR(255) NOT NULL,

    amount DECIMAL(12,2) NOT NULL,

    due_date DATE NOT NULL,

    reference_month VARCHAR(7) NOT NULL,

    status VARCHAR(50) NOT NULL,

    unit_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_charge_unit
        FOREIGN KEY (unit_id)
        REFERENCES units(id)
);