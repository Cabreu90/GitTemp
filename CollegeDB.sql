-- Cesarin Abreu
-- github.com/cabreu90

create database collegedb;

use collegedb;

-- College staff's information
CREATE TABLE Staff
(staff_no			 int(10),
first_name			 varchar(15)  not null,
last_name			 varchar(15)  not null,
home_address		 varchar(50),
date_of_birth		 date,                           -- mmm-dd-yyyy
sex				 	 char check(sex in('f', 'm')),
position			 varchar(20),
location 			 varchar(15)  not null,
phone_number	     varchar(22),
CONSTRAINT pk_staff  PRIMARY KEY(staff_no));

-- 
CREATE TABLE Course
(course_no			 int(8),
course_title		 varchar(15) unique not null,    -- all courses must have a tittle
course_year 		 int(4),
leader_no			 int(10),						
CONSTRAINT pk_course PRIMARY KEY(course_no),
CONSTRAINT fk_leader FOREIGN KEY(leader_no) REFERENCES Staff(staff_no)); -- courses have a leader from the staff

--
CREATE TABLE Student
(matriculation_no    int(9),
first_name			 varchar(15)  not null,
last_name			 varchar(15)  not null,
street				 varchar(50)  not null,
city				 varchar(50)  not null,
post_code			 varchar(5)   not null,
date_of_birth		 date,                                    -- standard dd-mon-yy
sex 				 char check(sex in('f', 'm')),       
category 			 varchar(25),						      -- undergraduate/postgraduate etc
nationality		 	 varchar(20),
smoker 				 char(1) check(smoker in('y', 'n')),
special_needs 		 varchar(20),
comments			 varchar(50),
current_status		 char check(current_status in('p', 'w')), -- p = placed, w = waiting
major				 char(3),
next_of_kin_name		     varchar(25),
next_of_kin_relationship	 varchar(15),
next_of_kin_address		     varchar(50),
next_of_kin_telephone_no	 varchar(20),
course_no			         int(8),
adviser_no			         int(10),
CONSTRAINT pk_id PRIMARY KEY (matriculation_no),
CONSTRAINT fk_course  FOREIGN KEY (course_no)  REFERENCES Course (course_no),
CONSTRAINT fk_advisor FOREIGN KEY (adviser_no) REFERENCES Staff (staff_no));

--
CREATE TABLE Hall 
(hall_no			 int(5),
fname				 varchar(15) not null,
address				 varchar(50),
phone_no 			 varchar(22),
manager_no			 int(10),
CONSTRAINT pk_hall PRIMARY KEY(hall_no),
CONSTRAINT fk_manager FOREIGN KEY(manager_no) REFERENCES STAFF(staff_no));


-- INSERT ROOM-AVAILABLE
CREATE TABLE Flat
(flat_no			 int(5),
address				 varchar(50),
room_available		 int(2),          -- Number of rooms available.
CONSTRAINT pk_flat PRIMARY KEY(flat_no));


-- DELETE ROOM AVAILAVLE
CREATE TABLE Room
(place_no			 int(4),
room_no 			 int not null,    -- from 1-9
rent_rate			 dec(9, 2) not null,  
hall_no				 int(10),
flat_no				 int(10),
CONSTRAINT pk_place PRIMARY KEY (place_no),
CONSTRAINT fk_hall FOREIGN KEY (hall_no) REFERENCES Hall(hall_no),
CONSTRAINT fk_flat FOREIGN KEY (flat_no) REFERENCES FLAT(flat_no));

CREATE TABLE Lease
(lease_no 			 int(4),
lease_duration  	 int not null,    -- number of semesters, a mximum of 1 year(3 semesters)
start_date			 date,            -- standard dd-mon-yy
end_date			 date,
matriculation_no     int(9),
place_no			 int(4),
CONSTRAINT pk_lease PRIMARY KEY (lease_no),
CONSTRAINT fk_matriculation FOREIGN KEY (matriculation_no) REFERENCES Student(matriculation_no),
CONSTRAINT fk_place FOREIGN KEY (place_no) REFERENCES Room(place_no));


CREATE TABLE Invoice
(invoice_no	 		 int(4),
payment_due			 dec(10),
semester             varchar(6),       -- fall, summer or spring
payment_method		 varchar(20),
first_reminder		 date,
second_reminder		 date,
invoice_paid_date	 date,
lease_no 			 int(4),
CONSTRAINT pk_invoice PRIMARY KEY (invoice_no),
CONSTRAINT fk_lease FOREIGN KEY (lease_no) REFERENCES Lease(lease_no));


CREATE TABLE Inspection
(inspector_no        int(10),
flat_no              int(10), 
inspection_date 	 date,
room_condition 		 char check(room_condition in('y', 'n')),                   -- good?
comments 			 varchar(40),
CONSTRAINT pk_inspection  PRIMARY KEY (inspector_no, flat_no, inspection_date),
CONSTRAINT fk_inspection  FOREIGN KEY (inspector_no) REFERENCES Staff(staff_no),
CONSTRAINT fk_flat2 FOREIGN KEY (FLAT_NO) REFERENCES Flat(FLAT_NO));


