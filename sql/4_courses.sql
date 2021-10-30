use classPlusPlus;

create table courses (
  ID char(36) not null,
  Label varchar(255) not null,
  Title varchar(255) not null,
  Description varchar(255) not null,
  CreatedByUserID char(36) not null,
  constraint courses_ID_uindex unique (ID),
  constraint courses_users_ID_fk foreign key (CreatedByUserID) references users (ID)
);

alter table
  courses
add
  primary key (ID);