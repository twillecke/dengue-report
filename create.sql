CREATE DATABASE dengue_db;

CREATE TABLE report (
    report_id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    reference_point VARCHAR(255),
    location_coordinates JSONB NOT NULL
);