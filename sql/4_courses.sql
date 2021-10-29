use classPlusPlus;

create table courses (
  ID char(36) not null,
  Label varchar(255) not null,
  Title varchar(255) not null,
  Description varchar(255) not null,
  constraint courses_ID_uindex unique (ID)
);

alter table
  courses
add
  primary key (ID);