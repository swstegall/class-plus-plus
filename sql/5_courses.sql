use classPlusPlus;

create table courses (
  ID char(36) not null primary key,
  Label varchar(255) not null,
  Title varchar(255) not null,
  Description varchar(255) not null,
  CreatedByUserID char(36) not null,
  constraint courses_users_ID_fk foreign key (CreatedByUserID) references users (ID)
);