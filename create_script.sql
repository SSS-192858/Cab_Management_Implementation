drop database if exists Cab_management_system;
create database Cab_management_system;
use Cab_management_system;

create table user(
    user_id INTEGER PRIMARY KEY auto_increment,
    username varchar(100) UNIQUE NOT NULL,
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
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE user_roles
ADD CONSTRAINT fk_role_userRoles
FOREIGN KEY (role_id) REFERENCES role(role_id) on delete cascade;

ALTER TABLE customer
ADD CONSTRAINT fk_customer_user
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE driver
ADD CONSTRAINT fk_driver_user
FOREIGN KEY (user_id) REFERENCES user(user_id) on delete cascade;

ALTER TABLE cab
ADD CONSTRAINT fk_cab_cabdriver
FOREIGN KEY (driver_id) REFERENCES driver(driver_id) on delete set null; 

ALTER TABLE request
ADD CONSTRAINT fk_cab_request
FOREIGN KEY (registration_number) REFERENCES cab(registration_number) on delete cascade;

ALTER TABLE request
ADD CONSTRAINT fk_cust_request
FOREIGN KEY (customer_id) REFERENCES customer(customer_id) on delete cascade;

ALTER TABLE customer_cab
ADD CONSTRAINT fk_cab_customer_reg_no
FOREIGN KEY (registration_number) REFERENCES cab(registration_number) on delete cascade;

ALTER TABLE customer_cab
ADD CONSTRAINT fk_cust_cab_id
FOREIGN KEY (customer_id) REFERENCES customer(customer_id) on delete cascade;

INSERT INTO role values (1,'ADMIN'),(2,'DRIVER'),(3,'CUSTOMER');
INSERT INTO user values (1,"admin","$2a$08$qlXB4Pk7sF9ApzimkeQI0eDGvPWGal.Y265Goukid6hdlzz/QN/cy");
-- test123
INSERT INTO user values (2,"driver","$2a$08$qlXB4Pk7sF9ApzimkeQI0eDGvPWGal.Y265Goukid6hdlzz/QN/cy");
INSERT INTO user values (3,"customer","$2a$08$qlXB4Pk7sF9ApzimkeQI0eDGvPWGal.Y265Goukid6hdlzz/QN/cy");
INSERT INTO customer values (1,3,"Customer1","customer@gmail.com","8126371782");
INSERT INTO driver values (1,2,"Driver1", "driver@gmail.com", "7185516728");

INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 1 FROM user WHERE user.username = "admin";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "driver";
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "customer";

INSERT INTO user values (4,"bmahesh","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (2,4,"Mahesh B","mahesh@test.com","7848578485");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "bmahesh";

INSERT INTO user values (5,"sankalpk","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (2,5,"Sankalp Kothari","sankalpkothari04@gmail.com","8888777788");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "sankalpk";

INSERT INTO user values (6,"sidk","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (3,6,"Siddharth Kothari","siddharthvatps@gmail.com","8877777788");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "sidk";

INSERT INTO user values (7,"msrini","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (4,7,"M Srinivasan","sankalpkothari04@gmail.com","8888777788");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "msrini";

INSERT INTO user values (8,"alexdarcy","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (5,8,"Alexandra Darcy","alex.darcy@test.com","1234567890");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "alexdarcy";

INSERT INTO user values (9,"jakeper","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (6,9,"Jake Peralta","jperalta@test.com","9638527410");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "jakeper";

INSERT INTO user values (10,"rosadiaz","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (7,10,"Rosa Diaz","diaz.rosa@test.com","9856321407");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "rosadiaz";

INSERT INTO user values (11,"jeffords","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (3,11,"Terry Jeffords","terry@test.com","9546781203");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "jeffords";

INSERT INTO user values (12,"phildunphy","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (4,12,"Philip Dunphy","dunphy@test.com","5124630789");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "phildunphy";

INSERT INTO user values (13,"eltonjoni","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (8,13,"Joni Elton","joni.elton@test.com","9955113322");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "jonielton";

INSERT INTO user values (14,"pettigrew","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (9,14,"Patty Pettigrew","thesuperiorpettigrew@test.com","8456789456");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "pettigrew";

INSERT INTO user values (15,"hhjort","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (5,15,"Hjalmar Hjort","hhjort@test.com","1100110100");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "hhjort";

INSERT INTO user values (16,"mikeclark","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (10,16,"Micheal Clark","micky@test.com","5464566544");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "mikeclark";

INSERT INTO user values (17,"johndoe","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (6,17,"John Doe","johndoe@test.com","7894561238");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "johndoe";

INSERT INTO user values (18,"chad","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (7,18,"Chad Darby","gigachad@test.com","7979797946");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "chad";

INSERT INTO user values (19,"jtaylor","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (11,19,"Jerome Taylor","@test.com","3322332232");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "jtaylor";

INSERT INTO user values (20,"pickie","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (12,20,"Jordan Pickford","jpicks@test.com","1885522852");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "pickie";

INSERT INTO user values (21,"jp","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (13,21,"Jay Pritchett","jpcnc@test.com","9966334411");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "jp";

INSERT INTO user values (22,"freddie","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (14,22,"Frederick Lemar","flemar@test.com","8546854685");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "freddie";

INSERT INTO user values (23,"sonny","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (15,23,"Son Heung-Min","hmson@test.com","1234567880");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "sonny";

INSERT INTO user values (24,"niclehr","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (16,24,"Nicole Lehr","niclehr@test.com","7744558878");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "niclehr";

INSERT INTO user values (25,"sushill","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (8,25,"Susan Hill","sushill@test.com","2234667890");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "sushill";

INSERT INTO user values (26,"jimmyanderson","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (17,26,"James Anderson","jimmyand@test.com","8021212121");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "jimmyanderson";

INSERT INTO user values (27,"marshmellow","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (18,27,"Marshall Eriksen","eriksenmarshall147@test.com","6523652365");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "marshmellow";

INSERT INTO user values (28,"bstinson","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (19,28,"Barney Stinson","suitup@test.com","9469469469");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "bstinson";

INSERT INTO user values (29,"admin1","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 1 FROM user WHERE user.username = "admin1";

INSERT INTO user values (30,"mmorales","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (20,30,"Miles Morales","moreorless@test.com","5423654654");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "mmorales";

INSERT INTO user values (31,"raphaguerreiro","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (9,31,"Raphael Guerreiro","raphaguerreiro@test.com","8456984567");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "raphaguerreiro";

INSERT INTO user values (32,"davidmoses","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO driver values (10,32,"David James Moses","djmoses@test.com","2200220022");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 2 FROM user WHERE user.username = "davidmoses";

INSERT INTO user values (33,"wardmcleod","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (21,33,"Ward McLeod","wardmcleod@test.com","8546802131");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "wardmcleod";

INSERT INTO user values (34,"blively","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (22,34,"Blake Lively","blively@test.com","1234533330");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "blively";

INSERT INTO user values (35,"phillipslaura","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (23,35,"Laura Phillips","plaura@test.com","1234567440");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "phillipslaura";

INSERT INTO user values (36,"kbaum","$2a$12$Yi8Rj1sWIikVcck1XHSKG.904xad0EkhglIk6gXCSAAtOEHzTYucu");
INSERT INTO customer values (24,36,"Kristoph Baumgartner","kbaum@test.com","1237897890");
INSERT INTO user_roles (user_id, role_id) SELECT user.user_id, 3 FROM user WHERE user.username = "kbaum";

INSERT INTO cab values ("KA-12-C1-9090","Swift Dzire","Silver",5000.00,NULL);
INSERT INTO cab values ("KA-01-BQ-8456","Hyundai i20","Silver",4500.00,1);
INSERT INTO cab values ("KA-12-G3-8942","Swift Dzire","White",5000.00,NULL);
INSERT INTO cab values ("KA-14-OP-1054","Datsun Redi-GO","Red",3000.00,1);
INSERT INTO cab values ("KA-35-B8-4610","Maruti Suzuki Alto","Red",3200.00,4);
INSERT INTO cab values ("KA-01-P3-3047","Honda City","Metallic Beige",4000.00,3);
INSERT INTO cab values ("KA-89-P1-3984","Toyota Innova","White",8000.00,3);
INSERT INTO cab values ("KA-45-C9-7967","Fortuner","Black",6900.00,1);
INSERT INTO cab values ("KA-66-A8-8213","Mahindra Thar","Black",6000.00,NULL);
INSERT INTO cab values ("KA-01-B3-7467","Swift Dzire","Silver",5000.00,5);
INSERT INTO cab values ("KA-01-BQ-8021","Hyundai i20","Silver",4500.00,6);
INSERT INTO cab values ("KA-14-K2-6035","Toyota Innova","Metallic Blue",8000.00,6);
INSERT INTO cab values ("KA-13-J2-9894","Chevrolet Cruze","Red",3800.00,7);
INSERT INTO cab values ("KA-76-L2-4021","Kia Seltos","Black",5600.00,7);
INSERT INTO cab values ("KA-56-I9-2023","Suzuki Alto K10","Silver",3600.00,9);
INSERT INTO cab values ("KA-45-I4-1947","Mahindra Bolero","Brown",6000.00,3);
INSERT INTO cab values ("KA-18-I3-2546","Suzuki Swift","White",5000.00,10);
INSERT INTO cab values ("KA-19-G3-6489","Hyundai Creta","Black",7200.00,1);
INSERT INTO cab values ("KA-14-BU-8602","Mahindra Scorpio","Silver",5700.00,5);
INSERT INTO cab values ("KA-17-KD-9102","Skoda Rapid","Silver",4000.00,4);
INSERT INTO cab values ("KA-01-PC-7946","Honda Amaze","White",5000.00,8);
INSERT INTO cab values ("KA-02-NP-5020","Swift Dzire","Silver",5000.00,9);
INSERT INTO cab values ("KA-10-S2-5319","Renault Triber","Red",4000.00,8);

INSERT INTO request values (1,2,"KA-01-BQ-8456","2023-07-17 05:00:00","2023-07-19 05:00:00");
INSERT INTO request values (2,3,"KA-01-BQ-8456","2023-07-17 10:00:00","2023-07-18 10:00:00");
INSERT INTO request values (3,6,"KA-14-K2-6035","2023-07-27 14:30:00","2023-07-27 22:30:00");
INSERT INTO request values (4,6,"KA-76-L2-4021","2023-08-01 22:00:00","2023-08-04 21:59:59");
INSERT INTO request values (5,2,"KA-02-NP-5020","2023-08-01 03:30:00","2023-08-02 03:30:00");
INSERT INTO request values (6,9,"KA-45-I4-1947","2023-07-30 08:00:00","2023-07-31 05:00:00");
INSERT INTO request values (7,8,"KA-01-BQ-8456","2023-08-05 15:00:00","2023-08-08 15:00:00");
INSERT INTO request values (8,24,"KA-01-BQ-8021","2023-08-19 11:00:00","2023-08-19 23:00:00");
INSERT INTO request values (9,13,"KA-01-PC-7946","2023-08-18 11:30:00","2023-08-19 11:30:00");
INSERT INTO request values (10,18,"KA-14-OP-1054","2023-08-10 11:00:00","2023-08-13 11:00:00");

INSERT INTO customer_cab values (1,1,"KA-13-J2-9894","2023-01-12 09:00:00","2023-01-14 08:00:00");
INSERT INTO customer_cab values (2,2,"KA-02-NP-5020","2023-02-14 08:00:00","2023-02-15 08:00:00");
INSERT INTO customer_cab values (3,5,"KA-14-K2-6035","2023-01-27 12:30:00","2023-01-30 12:30:00");
INSERT INTO customer_cab values (4,4,"KA-35-B8-4610","2023-02-19 13:00:00","2023-02-19 21:00:00");
INSERT INTO customer_cab values (5,4,"KA-01-BQ-8456","2023-02-28 21:30:00","2023-03-02 21:30:00");
INSERT INTO customer_cab values (6,7,"KA-01-PC-7946","2023-03-13 08:00:00","2023-03-14 07:00:00");
INSERT INTO customer_cab values (7,3,"KA-10-S2-5319","2023-04-05 12:00:00","2023-04-06 00:00:00");
INSERT INTO customer_cab values (8,20,"KA-35-B8-4610","2023-04-16 17:00:00","2023-04-20 16:00:00");
INSERT INTO customer_cab values (9,12,"KA-89-P1-3984","2023-05-08 11:30:00","2023-05-11 11:30:00");
INSERT INTO customer_cab values (10,10,"KA-76-L2-4021","2023-06-10 11:00:00","2023-06-13 11:00:00");

