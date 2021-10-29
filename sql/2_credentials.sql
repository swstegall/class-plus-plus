use classPlusPlus;

create table credentials (
  ID char(36) not null,
  Email varchar(255) not null,
  Password varchar(255) not null,
  constraint credentials_Email_uindex unique (Email),
  constraint credentials_ID_uindex unique (ID)
);

alter table
  credentials
add
  primary key (ID);