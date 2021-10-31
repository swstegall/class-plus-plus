use classPlusPlus;

create table credentials (
  ID char(36) not null primary key,
  Email varchar(255) not null,
  Password varchar(255) not null
);