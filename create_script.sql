drop database if exists Cab_management_system;
create database Cab_management_system;
use Cab_management_system;

create table user(
    user_id INTEGER PRIMARY KEY auto_increment,
    username varchar(100) NOT NULL,
    password char(68) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER NOT NULL auto_increment,
    role_name varchar(100) NOT NULL,
    constraint pk_role PRIMARY KEY (role_id)
);

CREATE TABLE user_roles (
    user_id INTEGER,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE driver(
    driver_id INTEGER auto_increment,
    user_id INTEGER UNIQUE NOT NULL,
    driver_name varchar(100) DEFAULT NULL,
    driver_email varchar(100) DEFAULT NULL,
    driver_phno varchar(100) DEFAULT NULL,
    constraint pk_driver PRIMARY KEY (driver_id)
);

CREATE TABLE customer(
    customer_id INTEGER auto_increment,
    user_id INTEGER UNIQUE NOT NULL,
    customer_name varchar(100) DEFAULT NULL,
    customer_email varchar(100) DEFAULT NULL,
    customer_phno varchar(100) DEFAULT NULL,
    constraint pk_customer PRIMARY KEY (customer_id)
);

CREATE TABLE cab(
    registration_number varchar(20),
    model varchar(20) DEFAULT NULL,
    colour varchar(20) DEFAULT NULL,
    fare DOUBLE,
    driver_id INTEGER DEFAULT NULL,
    constraint pk_cab PRIMARY KEY (registration_number)
);

CREATE TABLE request(
    slno INTEGER auto_increment,
    customer_id INTEGER,
    registration_number varchar(20),
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date datetime DEFAULT NULL,
    constraint pk_request PRIMARY KEY (slno)
);

CREATE TABLE customer_cab(
    slno INTEGER auto_increment,
    customer_id INTEGER,
    registration_number varchar(20),
    start_date timestamp NOT NULL DEFAULT current_timestamp(),
    end_date datetime DEFAULT NULL,
    constraint pk_cust_cab PRIMARY KEY (slno)
);

ALTER TABLE user_roles
ADD CONSTRAINT fk_user_userRoles
FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE user_roles
ADD CONSTRAINT fk_role_userRoles
FOREIGN KEY (role_id) REFERENCES role(role_id);

ALTER TABLE customer
ADD CONSTRAINT fk_customer_user
FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE driver
ADD CONSTRAINT fk_driver_user
FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE cab
ADD CONSTRAINT fk_cab_cabdriver
FOREIGN KEY (driver_id) REFERENCES driver(driver_id) on delete set null; 

ALTER TABLE request
ADD CONSTRAINT fk_cab_request
FOREIGN KEY (registration_number) REFERENCES cab(registration_number);

ALTER TABLE request
ADD CONSTRAINT fk_cust_request
FOREIGN KEY (customer_id) REFERENCES customer(customer_id);

ALTER TABLE customer_cab
ADD CONSTRAINT fk_cab_customer_reg_no
FOREIGN KEY (registration_number) REFERENCES cab(registration_number);

ALTER TABLE customer_cab
ADD CONSTRAINT fk_cust_cab_id
FOREIGN KEY (customer_id) REFERENCES customer(customer_id);

INSERT INTO role values (1,'ADMIN'),(2,'DRIVER'),(3,'CUSTOMER');
INSERT INTO user values (1,"admin","$2a$08$qlXB4Pk7sF9ApzimkeQI0eDGvPWGal.Y265Goukid6hdlzz/QN/cy");
-- test123
INSERT INTO user values (2,"driver","$2a$08$qlXB4Pk7sF9ApzimkeQI0eDGvPWGal.Y265Goukid6hdlzz/QN/cy");
INSERT INTO user values (3,"customer","$2a$08$qlXB4Pk7sF9ApzimkeQI0eDGvPWGal.Y265Goukid6hdlzz/QN/cy");

INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 1 FROM user WHERE user.username = "admin";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "driver";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "customer";
